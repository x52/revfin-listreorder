import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button, Stack, Form } from "react-bootstrap";
import { getAllItems, updateItem, deleteItem, addItem } from "../services/service";

import { MDBInput ,MDBIcon, MDBTypography,MDBTextArea,MDBCollapse, MDBBtn } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import "../style.scss";
import { ToastContainer, toast } from 'react-toastify';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  
  const grid = 5;
  
  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? "lightpurple" : "lightred",
    ...draggableStyle,
  });
  
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "purple" : "black",
    padding: grid,
    width: 600,
    hieght:500,
    borderRadius:25
  });
class ListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      editingItemId: null,
      editedContent: "",
      name: "",
      description: "",
      search: "",
      currentPage: 1,
      itemsPerPage: 4,
      OrderId: "",
      expanded: false,
      editedName:""
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  toggleExpand = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  };

  showToastMessage = (message, type, ) => {
    toast[type](message);
};



  async componentDidMount() {
    const token = localStorage.getItem("token");
    try {
      const items = await getAllItems(token);
      this.setState({ items });
    } catch (error) {
      console.error(error);
    }
  }

  async submitEdit(itemId) {
    const token = localStorage.getItem("token");
   
    try {
      const { editedContent, editedName } = this.state;
      if(editedContent===undefined){
        this.showToastMessage('Description not entered', "warning");
      }
      else if(editedName === undefined){
        this.showToastMessage('Name not entered', "warning");
      }
      
      else{
        await updateItem(token, itemId, {Name:editedName, Description: editedContent });
        const updatedItems = this.state.items.map((item) =>
          item._id === itemId ? { ...item, Name: editedName, Description:editedContent  } : item
        );
        this.showToastMessage('Item Edited', "success");
        this.setState({ items: updatedItems, editingItemId: null, editedContent: "", editedName:"" });

      }
     
    } catch (error) {
      this.showToastMessage('Error While editing', "error");
      console.error(error);
    }
  }

  async deleteItem(item) {
    const token = localStorage.getItem("token");
    try {
      await deleteItem(token, item._id);
      const updatedItems = this.state.items.filter((i) => i._id !== item._id);
      this.showToastMessage('Item Deleted', "success");
      this.setState({ items: updatedItems });
    } catch (error) {
      this.showToastMessage('Unable to delete', "error");
      console.error(error);
    }
  }

  async addItem() {
    const token = localStorage.getItem("token");
    try {
      if(this.state.name.trim()===''){
        this.showToastMessage('Name not entered', "warning");
      }
     else if(this.state.description.trim()===''){
        this.showToastMessage('Description not entered', "warning");
      }
      else{
        await addItem(token, { Name: this.state.name, Description: this.state.description });
        this.showToastMessage('Item Added', "success");
      
        await this.fetchData();
        this.setState({ name: "", description: "", OrderId: "" });

      }
     
    } catch (error) {
      this.showToastMessage('Item Not Added', "error");
      console.error(error);
    }
  }
 
  
  async fetchData() {
    const token = localStorage.getItem("token");
    try {
      const items = await getAllItems(token); // Using getAllItems function from service
      this.setState({ items });
    } catch (error) {
      console.error(error);
    }
  }
  
 onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const {itemsPerPage, currentPage} = this.state;
    const lastIndex = currentPage* itemsPerPage;
    const startIndex = lastIndex - itemsPerPage;
    const source = startIndex + result.source.index;
    const destination = startIndex + result.destination.index;


    const updateTwins = [this.state.items[source], this.state.items[destination]];
    const orderTWins = [this.state.items[source].OrderId, this.state.items[destination].OrderId];

    const items = reorder(this.state.items, source, destination);
    this.setState({ items });

    try {
        const token = localStorage.getItem("token");
        updateTwins.map(async (item, index) => {
          await updateItem(token, item._id, { OrderId: orderTWins[1 - index] });
        });
    } catch (error) {
      console.error(error);
    }
  } 

 

  editItem=(id, content,name) =>{
    this.setState({ editingItemId: id, editedContent: content, editedName: name });
  }

  handleEditChange=(event)=> {
    this.setState({ editedContent: event.target.value });
  }
  handleEditChangeName=(event)=> {
    this.setState({ editedName: event.target.value });
  }

  handleInputChange=(event) =>{
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSearch =(event)=> {
    this.setState({ search: event.target.value });
  }

  handleClearBtn =()=>{
    this.setState({search:''})
  }
  render() {
    const { items, editingItemId, editedContent, name, description, search, currentPage, itemsPerPage, OrderId, expanded,editedName } = this.state;

    const filteredItems = items.filter((item) => item.Name.toLowerCase().includes(search.toLowerCase()));

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

    return (
      <div className="body-list">
      <div className='container'>
  <ToastContainer />
        <div className="header">
        <MDBTypography tag='h3' className='mb-0'>
      Revfin
      <MDBTypography tag='small' className='text-muted'>
       List Reorder
      </MDBTypography>
    </MDBTypography>

        </div>

        <div className='input-wrap'>
        <i className="fas fa-search"></i>
        <label 
          for="product-search" 
          id="input-label"
        >
          Product Search
        </label>
        <input 
          onChange={this.handleSearch}
          value={search}
          type="text" 
          name="product-search" 
          id="product-search" 
          placeholder="Search Products by Name"
        />
        <i 
          onClick={this.handleClearBtn}
          className="fas fa-times"
        ></i>
      </div>
         
        <div class="splitter">
          <div id="add-item">

          <p className="fw-normal">This is a web app to perform CRUD based operations on Items which has a name and a description. We can drag these items to reorder in the list. And, user has to be authenticated in order to perform CRUD.</p>

            {expanded ? (  <MDBBtn className='lx-3' color='danger' onClick={this.toggleExpand}>
      <MDBIcon far icon="times-circle" />
      Close</MDBBtn>): ( <MDBBtn rounded className='lx-2' color='dark' onClick={this.toggleExpand}>
          <MDBIcon far icon="plus-square" />  Add Item
      </MDBBtn>)}
         
        
     
      <MDBCollapse open={expanded} className='mt-3'>
    
      <Form>
                    <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <MDBInput label="Enter Name" type="text" id="formWhite" name="name" value={name} onChange={this.handleInputChange} contrast />
                     
                    { /* <Form.Control type="text" placeholder="Enter name" name="name" value={name} onChange={this.handleInputChange} /> */}
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                      <Form.Label>Description</Form.Label>
                      <MDBTextArea label="Message" id="textAreaExample" rows="{3}" name="description" value={description} onChange={this.handleInputChange} contrast/>
                     {/*<Form.Control type="text" placeholder="Enter description" name="description" value={description} onChange={this.handleInputChange} />*/}
                    </Form.Group>
                   
                    <br />
                    <Button variant="dark" onClick={() => this.addItem()}>
                    <MDBIcon far icon="plus-square" />
                      Add Item
                    </Button>
                  </Form>
        
      </MDBCollapse>
          </div>

        
          <div className="vr" style={{ height: '500px',marginLeft:'2rem'}}></div>


          <div className="order-container">
            <div id="list-reorder">
            {(items.length >0) ?(
              <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                      {currentItems.map((item, index) => (
                        <Draggable key={item._id} draggableId={item._id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                            >
                              <div id="content-layout-item">
                                {editingItemId === item._id ? (
                                  <div>
                                    <Stack direction="horizontal" gap={2}>
                                    <MDBInput label="Enter Name" type="text" id="formWhite" name="description" value={editedName} onChange={(e) => this.handleEditChangeName(e)}  contrast />

                                    <MDBInput label="Enter Description" type="text" id="formWhite" name="name" value={editedContent} onChange={(e) => this.handleEditChange(e)} contrast />
                                   
                                    <MDBBtn rounded className='sm-2' color='dark'onClick={() => this.submitEdit(item._id)}>
                                   
                                      Submit
                                      </MDBBtn>
                                    </Stack>
                                  </div>
                                ) : (
                                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <Stack direction="horizontal" gap={3}>
                                    <p style={{ color: "white" }}>
                                      <strong> Name: </strong>{item.Name}    &nbsp; &nbsp;&nbsp;
                                      <strong>Description: </strong><i>{item.Description}</i>
                                    </p>
                                    <hr />
                                  </Stack>
                                  <div id="buttons-tab">
                                    <Stack direction="horizontal" gap={2}>

                                    <MDBBtn rounded className='sm-2' color='dark'onClick={() => this.editItem(item._id, item.content)}>
                                    <MDBIcon fas icon="edit"  />  edit
      </MDBBtn>

      <MDBBtn rounded className='sm-2' color='dark'onClick={() => this.deleteItem(item)}>
      del <MDBIcon fas icon="ban"  />
      </MDBBtn>
                                      
                                    
                                      {/*  <Button variant="outline-dark" onClick={() => this.editItem(item._id, item.content)}>
                                        Edit
                                      </Button>
                                      <Button variant="outline-dark" onClick={() => this.deleteItem(item)}>
                                        Delete
                                      </Button>*/}
                                    </Stack>
                                  </div>
                                </div>
                                
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>) : (<div id="no-list-banner">
              <MDBTypography tag='div' className='display-4 pb-3 mb-3 '>
                <br />
      No items to show. Add it to see the list.
      </MDBTypography> </div>)}
            </div>

            <div id="paginate">
              <div>
                <Stack direction="horizontal" gap={5}>
                  <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} variant="dark">
                  <MDBIcon fas icon="angle-double-left" /> Previous
                  </Button>
                  <Button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= filteredItems.length} variant="dark">
                  <MDBIcon fas icon="angle-double-right" /> Next
                  </Button> 
                  
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default ListComponent;




