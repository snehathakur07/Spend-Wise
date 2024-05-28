const IncomeSchema = require("../models/IncomeModel");


exports.addIncome = async (req, res) => {
    console.log(req.body);
    const { title, amount, category, description, date } = req.body;
    const amountNumber = parseFloat(amount);
    const income = IncomeSchema({
        title,
        amount: amountNumber,
        category,
        description,
        date
    })
    console.log(income)

    try {
        //validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (amountNumber <= 0 || isNaN(amountNumber)) {
            return res.status(400).json({ message: "Amount must be a positive number" })
        }

        await income.save()
        res.status(200).json({ message: "Income Added" })
    }
    catch (error) {
        console.error("Error adding income:", error);
        res.status(500).json({ message: "Error adding income" });
    }
}


exports.getIncomes=async(req,res)=>{
    try{
        const incomes=await IncomeSchema.find().sort({createdAt:-1});
        res.status(200).json(incomes)
    }
    catch(error){
        res.status(500).json({message:"Server error fetching incomes"})
    }
}

exports.deleteIncome=async(req,res)=>{
    const {id}=req.params;
    console.log(id)
    IncomeSchema.findByIdAndDelete(id)
    .then((income)=>{
        res.status(200).json({message:"Income Deleted"})
    })
    .catch((err)=>{
        res.status(500).json({message:"Server Error"})
    })
}