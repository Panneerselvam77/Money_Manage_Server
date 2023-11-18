import express from "express";
import { TransactionModel } from "../Models/Transaction.js";
import moment from "moment";

// Configureing Router
const route = express.Router();

/* Adding New Transactions */

route.post("/add-transaction", async (req, res) => {
  try {
    const newTransaction = new TransactionModel(req.body);
    await newTransaction.save();
    res.status(200).json({
      message: "Transactions Added Sucessfully",
      NewItems: newTransaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", Error: error });
  }
});

/* Getting All Added Transactions */

route.post("/get-all-transactions", async (req, res) => {
  const { frequency, selectRange, type } = req.body;
  try {
    const transactions = await TransactionModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(req.body.frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectRange[0],
              $lte: selectRange[1],
            },
          }),
      userid: req.body.useid,
      ...(type !== "all" && { type }),
    });
    res.status(200).json({
      message: "Transaction Getted Successfully",
      Transaction: transactions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", Error: error });
  }
});

/*  Edit Transaction */

route.post("/edit-transaction", async (req, res) => {
  try {
    const updateTransaction = await TransactionModel.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );

    res.status(200).json({
      message: "Transactions Updated Sucessfully",
      Transaction: updateTransaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", Error: error });
  }
});

/* Delete Transaction  */

route.post("/delete-transaction", async (req, res) => {
  try {
    const deleteTransaction = await TransactionModel.findOneAndDelete({
      _id: req.body.transactionId,
    });
    res.status(200).json({
      message: "Transactions Deleted Sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", Error: error });
  }
});

export const transactionRoute = route;
