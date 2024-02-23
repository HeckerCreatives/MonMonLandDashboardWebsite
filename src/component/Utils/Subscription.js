exports.getsubsamount = (substype) => {
    let subsamount = 0;

    switch(substype){
        case "Pearlplus":
            subsamount = 10
            break;
        case "Ruby":
            subsamount = 20
            break;
        case "Emerald":
            subsamount = 50
            break;
        case "Diamond":
            subsamount = 100
            break;
        default:
            subsamount = 0;
            break;
    }

    return subsamount;
}