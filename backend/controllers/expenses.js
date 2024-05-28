const ExpenseSchema = require("../models/ExpenseModel");


exports.addExpense = async (req, res) => {
    console.log(req.body);
    const { title, amount, category, description, date } = req.body;
    const amountNumber = parseFloat(amount);
    const Expense = ExpenseSchema({
        title,
        amount: amountNumber,
        category,
        description,
        date
    })
    console.log(Expense)

    try {
        //validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (amountNumber <= 0 || isNaN(amountNumber)) {
            return res.status(400).json({ message: "Amount must be a positive number" })
        }

        await Expense.save()
        res.status(200).json({ message: "Expense Added" })
    }
    catch (error) {
        console.error("Error adding Expense:", error);
        res.status(500).json({ message: "Error adding Expense" });
    }
}


exports.getExpenses=async(req,res)=>{
    try{
        const Expenses=await ExpenseSchema.find().sort({createdAt:-1});
        res.status(200).json(Expenses)
    }
    catch(error){
        res.status(500).json({message:"Server error fetching Expenses"})
    }
}

exports.deleteExpense=async(req,res)=>{
    const {id}=req.params;
    console.log(id)
    ExpenseSchema.findByIdAndDelete(id)
    .then((Expense)=>{
        res.status(200).json({message:"Expense Deleted"})
    })
    .catch((err)=>{
        res.status(500).json({message:"Server Error"})
    })
}