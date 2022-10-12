/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import PropTypes from 'prop-types';

function ListOfNotes({
  notes,
  passIdToDel,
  addBtnName,
  delBtnName,
  addNote,
  setAddedNoteId,
  style,
}) {
  const DEFAULT_STYLE = {
    headerBlock: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
      marginBottom: '20px',
    },
    header: { fontSize: '20px' },
    addBtn: { width: '54.5px', borderRadius: '12px' },
    listOfNotes: { width: '80%' },
    note: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: '10px',
    },
    delBtn: { borderRadius: '5px' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 'full' }}>
      <div style={style?.headerBlock || DEFAULT_STYLE.headerBlock}>
        <button onClick={addNote} style={style?.addBtn || DEFAULT_STYLE.addBtn}>
          {addBtnName || 'Add'}
        </button>
      </div>
      <div style={style?.listOfNotes || DEFAULT_STYLE.listOfNotes}>
        {notes
          .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
          .map((el) => (
            <div key={el.id} style={style?.note || DEFAULT_STYLE.note}>
              <div
                onClick={() => setAddedNoteId(el.id)}
                style={style?.title || DEFAULT_STYLE.title}
              >
                {el.title || 'untitled'}
              </div>
              <div className="note-btn">
                <button
                  style={style?.delBtn || DEFAULT_STYLE.delBtn}
                  onClick={() => passIdToDel(el.id)}
                >
                  {delBtnName || 'Delete'}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

ListOfNotes.defaultProps = {
  notes: [],
};

ListOfNotes.propTypes = {
  /** add button name */
  addBtnName: PropTypes.string,
  /** Receives the id at the entrance  */
  addNote: PropTypes.func,
  /** delete button name */
  delBtnName: PropTypes.string,
  /** array of existing notes */
  notes: PropTypes.array,
  /** Receives the id at the entrance */
  passIdToDel: PropTypes.func,
  /** Receives the id at the entrance */
  setAddedNoteId: PropTypes.func,
  style: PropTypes.shape({
    /** style for add button */
    addBtn: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /** style for delete button */
    delBtn: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /** style for header block */
    headerBlockStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /** style for list of notes */
    listOfNotes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /** style for note */
    note: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
};

export default ListOfNotes;
