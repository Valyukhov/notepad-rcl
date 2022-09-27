import { default as React, useState, useEffect, useRef, useMemo } from 'react';

import localforage from 'localforage';
import PropTypes from 'prop-types';

import EditorJS from '@editorjs/editorjs';

const EDITTOR_HOLDER_ID = 'note_id';

function DefaultSaveNote(key, title, note) {
  localforage.getItem(key).then(function (value) {
    value
      ? localforage.setItem(key, {
          ...value,
          title: title || 'New note',
          data: note,
        })
      : localforage.setItem(key, {
          title: title,
          data: note,
          created: new Date(),
          parent: null,
          isFolder: false,
        });
  });
}

function DefaultGetNote(id) {
  const result = localforage.getItem(id);
  return result;
}

function Editor({ id, editorTools, placeholder, inputStyle, SaveNoteFn, GetNoteFn }) {
  const holder = useMemo(() => id || EDITTOR_HOLDER_ID, [id]);
  const ejInstance = useRef();
  const [editorData, setEditorData] = useState({});
  const [title, setTitle] = useState('');
  const defaultTitleStyle = {
    width: '650px',
    height: '38px',
    fontSize: 'large',
    border: 'none',
    outline: 'none',
  };

  // This will run only once
  useEffect(() => {
    if (!ejInstance?.current) {
      initEditor();
    }
    return () => {
      if (ejInstance?.current) {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, [id]);

  // Track the status of the note. If it changes, then save the changes in localforage
  useEffect(() => {
    const timer = setTimeout(() => {
      typeof SaveNoteFn === 'function'
        ? SaveNoteFn(holder, title, editorData)
        : DefaultSaveNote(holder, title, editorData);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [editorData, title]);

  const isCustomGetNote = () => {
    let res;
    typeof GetNoteFn === 'function'
      ? (res = GetNoteFn(holder))
      : (res = DefaultGetNote(holder));
    return res;
  };

  // Запуск Editor.js
  const initEditor = async () => {
    const defData = await isCustomGetNote();
    setEditorData(defData?.data);
    setTitle(defData?.title);

    const editor = new EditorJS({
      holder,
      placeholder: placeholder || 'Let`s write an awesome note!',

      logLevel: 'ERROR',

      data: defData?.data,

      onReady: () => {
        ejInstance.current = editor;
      },

      onChange: async (api, event) => {
        let content = await api.saver.save();
        // Put your logic here to save this data to your DB
        setEditorData(content);
      },
      autofocus: false,
      tools: editorTools,
    });
  };

  return (
    <React.Fragment>
      <div
        style={{
          display: 'inline-flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle || defaultTitleStyle}
        ></input>
      </div>
      <div id={holder}></div>
    </React.Fragment>
  );
}

Editor.propTypes = {
  // inputStyle,
  /** Write a new property for the Tools object and pass it to the Editor via the addTools variable */
  editorTools: PropTypes.object,
  /** note ID */
  id: PropTypes.string,
  /** note Placeholder */
  placeholder: PropTypes.string,
  /** note save method (by default note is stored in localforage).
Receives the key title and note at the entrance */
  SaveNoteFn: PropTypes.func,
};

export default Editor;
