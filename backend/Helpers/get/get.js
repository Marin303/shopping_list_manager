function getData(data) {
    return (req, res) => {
        res.json(data.products);
    };
}

export { getData };
