export const initialData = [
  {
    id: '1_n',
    title: 'note1',
    is_folder: false,
    parent_id: null,
    sorting: 0,
  },
  {
    id: '2_n',
    title: 'note2',
    is_folder: false,
    parent_id: null,
    sorting: 1,
  },
  {
    id: '3_n',
    title: 'note3',
    is_folder: false,
    parent_id: null,
    sorting: 2,
  },
  {
    id: '1_fol',
    title: 'folder1',
    is_folder: true,
    parent_id: null,
    sorting: 3,
  },
  {
    id: '4_n',
    title: 'note4',
    is_folder: false,
    parent_id: '1_fol',
    sorting: 0,
  },
  {
    id: '2_fol',
    title: 'folder2',
    is_folder: true,
    parent_id: '1_fol',
    sorting: 1,
  },
  {
    id: '5_n',
    title: 'note5',
    is_folder: false,
    parent_id: '2_fol',
    sorting: 0,
  },
  [
    {
      id: '00hc25p3x',
      user_id: '883a6d93-1c72-4cc5-94fd-554b4357094d',
      title: 'new note',
      data: {
        blocks: [],
        version: '2.8.1',
      },
      created_at: '2023-10-25T12:54:57.567117',
      changed_at: '2023-10-25T12:54:57.567117',
      deleted_at: null,
      is_folder: true,
      parent_id: null,
      sorting: 0,
    },
  ],
];

export const style = {
  nodeWrapper: {
    lineHeight: '47px',
    fontSize: '18px',
    cursor: 'pointer',
    paddingLeft: '20px',
    paddingRight: '20px',
    // width: 'full', // не нужно?!
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#EDEDED',
    hoveredColor: '#D5D5D5',
    selectedColor: '#bdbdbd',
  },
  nodeTextBlock: { alignItems: 'center' },
  searchContainer: {
    position: 'relative',
    marginBottom: '20px',
    maxWidth: '500px',
  },
  searchInput: {
    border: '0',
    borderBottom: '1px solid #555',
    background: 'transparent',
    width: '100%',
    padding: '24px 0 5px 0',
    fontSize: '14px',
    outline: 'none',
  },
  searchLabel: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    fontSize: '14px',
    color: '#555',
    transition: 'all 0.5s ease-in-out',
  },
  menuContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
    zIndex: '100',
    whiteSpace: 'nowrap',
  },
  menuWrapper: { position: 'fixed', zIndex: 50 },
  emptyMenu: { padding: '10px', cursor: 'pointer', color: '#B5B8B1' },
  menuItem: {
    padding: '4px 30px 4px 10px',
    cursor: 'pointer',
    hoveredColor: '#EDEDED',
    backgroundColor: 'transparent',
  },
  renameButton: { paddingLeft: '30px' },
  removeButton: { paddingLeft: '5px' },
  renameInput: { width: '120px' },
};
