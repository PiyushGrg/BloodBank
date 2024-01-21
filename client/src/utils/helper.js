import moment from "moment";

export const getLoggedInUserName = (user)=>{
    if(user.userType === "donor"){
        return user.name;
    }
    else if(user.userType === "hospital"){
        return user.hospitalName;
    }
    else{
        return user.organizationName;
    }
}


export const getInputValidation = ()=>{
    return [{
        required: true,
        message: "Required",
    }]
}


export const getDateFormat = (date) => {
    return moment(date).format("DD MMM YYYY hh:mm A");
}