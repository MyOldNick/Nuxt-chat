const filterUsers = (name, array, keyName) => {
    
    if (name) {
        
        const nameLowerCase = name.toLowerCase();

        const newArray = array.filter(el => {
            
            const elLowerCase = el[keyName].toLowerCase();

            if (elLowerCase.indexOf(nameLowerCase) !== -1) return el
        });

        return newArray


    } else return array

}

export default filterUsers