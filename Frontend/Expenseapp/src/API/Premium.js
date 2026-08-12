
const checkPremium = async()=>{
    try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/premium",{
            method:"GET",
            headers:{
                'Content-Type':"application/json",
                'Authorization':token,
            }
        });
        const data = await res.json();
        console.log(data.user.Premium);
        return data.user.Premium;
    } catch (error) {
        console.log(error.message);
    }
};

export {
    checkPremium,
}