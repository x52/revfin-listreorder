import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const DraggableList = ({ itemsPerPage, items, currentPage, editItem, deleteItem }) => {
  const onDragEnd = (result) => {
    // Reorder logic
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items
              .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
              .map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.content}
                      <button onClick={() => editItem(item.id)}>Edit</button>
                      <button onClick={() => deleteItem(item.id)}>Delete</button>
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableList;
