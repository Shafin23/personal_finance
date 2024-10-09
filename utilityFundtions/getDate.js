function getFormattedDate() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1; // Months are zero-based
    let year = date.getFullYear();

    // Add leading zeros to day and month if needed
    if (day < 10) {
        day = '0' + day;
    }

    if (month < 10) {
        month = '0' + month;
    }

    return `${day}-${month}-${year}`;
}

module.exports = { getFormattedDate }