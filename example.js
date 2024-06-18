//USD converter
function USDconvert(amount) {
    return(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount))
}
// Function to create a list item from order data
function createListItem(order) {
    let listItem = document.createElement('li');
    listItem.textContent = order.customerName + " - Order ID: " + order.orderId + " - Amount: " + USDconvert(order.purchaseAmount);
    return listItem;
}
// Function to append list item to the receiver list
function appendListItem(listItem, receiverList) {
    let list = document.querySelector(receiverList);
        list.appendChild(listItem);

}

// Function to process CSV data
function createAndAppend(data, receiverList) {
    // 'data' here will be an array of objects (one for each row in the CSV)
    data.forEach(function(order) {
        let listItem = createListItem(order);
        appendListItem(listItem, receiverList);
    });
}

// Function to fetch CSV data and process it
function fetchAndFeed(csvFile, processor, receiverList) {
    d3.dsv(',', csvFile).then(function(data) {
        processor(data, receiverList);
    }).catch(function(error) {
        console.error('Error loading the CSV file:', error);
    });
}

// Setting desired CSV and receiving list
var csv1 = "data/purchase_orders.csv";
var receiverList = "#purchase-orders";

// Call the fetchAndFeed function on DOM load
document.addEventListener("DOMContentLoaded", function() {
    fetchAndFeed(csv1, createAndAppend, receiverList);
});
