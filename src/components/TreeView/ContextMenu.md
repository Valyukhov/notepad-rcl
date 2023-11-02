### **Using a custom context menu**

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { TreeView, ContextMenu } from '@texttree/notepad-rcl';
import { initialData } from './data';

function Component() {
  const treeRef = useRef(null);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [contextMenuEvent, setContextMenuEvent] = useState(null);
  const [currentNodeProps, setCurrentNodeProps] = useState(null);
  const [databaseNotes, setDatabaseNotes] = useState(initialData);
  const [dataForTreeView, setDataForTreeView] = useState(
    convertNotesToTree(databaseNotes)
  );

  function convertNotesToTree(notes, parentId = null) {
    const filteredNotes = notes.filter((note) => note.parent_id === parentId);

    filteredNotes.sort((a, b) => a.sorting - b.sorting);
    return filteredNotes.map((note) => ({
      id: note.id,
      name: note.title,
      ...(note.is_folder && {
        children: convertNotesToTree(notes, note.id),
      }),
    }));
  }

  useEffect(() => {
    setDataForTreeView(convertNotesToTree(databaseNotes));
  }, [databaseNotes]);

  const handleTreeEventDelete = ({ ids }) => {
    const updatedNote = databaseNotes.filter((el) => el.id !== ids[0]);
    setDatabaseNotes(updatedNote);
  };

  const handleRenameNode = (newName, nodeId) => {
    if (nodeId) {
      const updatedNote = databaseNotes.map((node) =>
        node.id === nodeId ? { ...node, title: newName } : node
      );
      setDatabaseNotes(updatedNote);
    }
  };

  const handleContextMenu = (event) => {
    setSelectedNodeId(hoveredNodeId);
    setContextMenuEvent({ event });
  };

  const handleRename = () => {
    currentNodeProps.node.edit();
  };

  const handleDelete = () => {
    currentNodeProps.tree.delete(currentNodeProps.node.id);
  };

  const renameIcon = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19 3.17139C18.7599 3.17139 18.5222 3.21868 18.3003 3.31057C18.0785 3.40245 17.8769 3.53714 17.7071 3.70692L4.39491 17.0191L3.42524 20.5746L6.9807 19.6049L20.2929 6.29271C20.4627 6.12292 20.5974 5.92136 20.6893 5.69952C20.7812 5.47769 20.8284 5.23993 20.8284 4.99981C20.8284 4.7597 20.7812 4.52194 20.6893 4.30011C20.5974 4.07827 20.4627 3.87671 20.2929 3.70692C20.1231 3.53714 19.9216 3.40245 19.6997 3.31057C19.4779 3.21868 19.2401 3.17139 19 3.17139ZM17.5349 1.46281C17.9994 1.27041 18.4973 1.17139 19 1.17139C19.5028 1.17139 20.0006 1.27041 20.4651 1.46281C20.9296 1.6552 21.3516 1.9372 21.7071 2.29271C22.0626 2.64821 22.3446 3.07025 22.537 3.53474C22.7294 3.99923 22.8284 4.49706 22.8284 4.99981C22.8284 5.50257 22.7294 6.0004 22.537 6.46489C22.3446 6.92938 22.0626 7.35142 21.7071 7.70692L8.20713 21.2069C8.08407 21.33 7.93104 21.4188 7.76314 21.4646L2.26314 22.9646C1.91693 23.059 1.54667 22.9607 1.29292 22.7069C1.03917 22.4532 0.940838 22.0829 1.03526 21.7367L2.53526 16.2367C2.58105 16.0688 2.66986 15.9158 2.79292 15.7927L16.2929 2.29271C16.6484 1.9372 17.0705 1.6552 17.5349 1.46281Z"
        fill="#242424"
      />
    </svg>
  );

  const menuItems = [
    { id: 'rename', icon: renameIcon, label: 'Rename', action: handleRename },
    { id: 'delete', label: '🗑️ Delete', action: handleDelete },
  ];

  return (
    <div>
      <div>
        <TreeView
          classes={{
            nodeWrapper:
              'flex px-5 leading-[47px] cursor-pointer rounded-lg bg-gray-100 hover:bg-gray-200',
            nodeTextBlock: 'items-center',
          }}
          nodeHeight={57}
          treeWidth={500}
          treeHeight={450}
          treeRef={treeRef}
          data={dataForTreeView}
          customContextMenu={true}
          hoveredNodeId={hoveredNodeId}
          selectedNodeId={selectedNodeId}
          handleRenameNode={handleRenameNode}
          setHoveredNodeId={setHoveredNodeId}
          setSelectedNodeId={setSelectedNodeId}
          handleContextMenu={handleContextMenu}
          getCurrentNodeProps={setCurrentNodeProps}
          handleTreeEventDelete={handleTreeEventDelete}
        />
        <ContextMenu
          setSelectedNodeId={setSelectedNodeId}
          selectedNodeId={selectedNodeId}
          data={contextMenuEvent}
          menuItems={menuItems}
          treeRef={treeRef}
          classes={{
            menuItem:
              'gap-2.5 py-1 pr-7 pl-2.5 cursor-pointer bg-gray-100 hover:bg-gray-200',
            menuWrapper: 'fixed z-50',
            menuContainer:
              'absolute border rounded z-[100] whitespace-nowrap bg-white shadow',
            emptyMenu: 'p-2.5 cursor-pointer text-gray-300',
          }}
        />
      </div>
    </div>
  );
}

<Component />;
```
