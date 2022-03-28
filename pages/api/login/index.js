
export default async (req, res)=>{
    try {
        const { username, password } = req.body;
        res.json({username, password, success: true})
        
    } catch (error) {
        console.log(error);
    }
}
