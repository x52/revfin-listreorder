import React from 'react';

const EditItemForm = ({ id, initialContent, editItem }) => {
  const [content, setContent] = React.useState(initialContent);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    editItem(id, { id, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit">Save</button>
    </form>
  );
};

export default EditItemForm;
