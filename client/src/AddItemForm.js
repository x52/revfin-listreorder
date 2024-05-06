import React from 'react';

const AddItemForm = ({ addItem }) => {
  const [content, setContent] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    addItem({ id: Date.now().toString(), content });
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddItemForm;
