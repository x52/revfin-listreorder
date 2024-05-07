const Item = require('../models/Item');

// Controller function to create a new item

async function getMaxOrderId() {
    try {
        const maxOrderId = await Item.findOne().sort('-OrderId').select('OrderId').lean();
        return maxOrderId ? maxOrderId.OrderId : 0; // Return 0 if no items found
    } catch (error) {
        console.error('Error fetching max OrderId:', error);
        return 0;
    }
}

const createItem = async (req, res) => {
    try {
        const maxOrderId = await getMaxOrderId();

        // Use the maximum OrderId + 1 as the OrderId for the new item
        const newItemData = {
            OrderId: maxOrderId + 1,
            Name: req.body.Name,
            Description: req.body.Description
        };

        // Create the new item
        const newItem = await Item.create(newItemData);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller function to get all items
const getItems = async (req, res) => {
    try {
        // Fetch items from the database and sort them by OrderId in ascending order
        const items = await Item.find().sort({ OrderId: 1 });

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Controller function to update an item by ID
const updateItem = async (req, res) => {
    try {
        console.log('oo', req.params.id, req.body)
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller function to delete an item by ID
const deleteItem = async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createItem,
    getItems,
    updateItem,
    deleteItem
};
