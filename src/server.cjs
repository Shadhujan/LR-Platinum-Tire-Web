const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const app = express();
const port = 3214;
const session = require("express-session");

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: "2454534543", // Change this to a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  }),
);
// Set up multer for file uploads
const storage = multer.memoryStorage(); // You can choose diskStorage if you prefer storing files on the server
const upload = multer({ storage });

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://jeya38shadhujan:sha123@samplefirst.jg9ty.mongodb.net/SampleReview",
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => {
    console.log("Current database:", mongoose.connection.db.databaseName);
  })
  .catch((err) => console.log(err));

// Define User model
let User = mongoose.model(
  "UsersCollection",
  new mongoose.Schema(
    {
      username: String, // Simplified field definition
      email: String,
      password: String,
      contact: {
        phone: String,
        address: String,
      },
      reviews: [
        {
          product_id: mongoose.Schema.Types.ObjectId, // Ref type simplified
          description: String,
          image: String, // URL of the image
          rating: Number,
          date: { type: Date, default: Date.now },
        },
      ],
      appointments: [
        {
          customer_name: String,
          mobile_num: Number,
          service_type: String,
          date: Date,
        },
      ],
      contacts: [
        {
          contact_name: String,
          email: String,
          message: String,
        },
      ],
    },
    { collection: "UsersCollection", timestamps: true },
  ),
);

// Define SampleReview model
let SampleReview = mongoose.model(
  "SampleReview",
  new mongoose.Schema(
    {
      email1: String,
      username1: String,
    },
    { collection: "SampleReview" },
  ),
);

app.post("/Server/Register", async (req, res) => {
  let newUser = new User(req.body);

  console.log(newUser);

  newUser
    .save()
    .then((savedUser) => {
      console.log("User saved to collection:", savedUser);
      res.status(200).json(savedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.toString() });
    });
});

app.get("/Server/User/Read/:EXAMPLEVARhehe", async (req, res) => {
  let EXAMPLEVAR = req.params.EXAMPLEVARhehe;
  console.log(EXAMPLEVAR);
  User.findOne({ username: EXAMPLEVAR })
    .then((MongoData) => {
      console.log(MongoData);
      res.json(MongoData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.toString() });
    });
});

app.put("/Server/UpdateProfile/:CurrentUserName", async (req, res) => {
  let CurrentUserName = req.params.CurrentUserName;
  let { Username, Password, Email } = req.body;
  console.log(Username);
  console.log(Password);
  console.log(Email);
  User.findOneAndUpdate(
    { username: CurrentUserName },
    { username: Username, password: Password, email: Email },
    { new: true },
  )
    .then((user) => {
      console.log("PROFILE UPDATED");
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log("Error updating profile:", err);
      res.status(500).json({ error: err.toString() });
    });
});

app.delete("/Server/DeleteProfile/:CurrentUserName", async (req, res) => {
  let Name = req.params.CurrentUserName;
  User.findOneAndDelete({ username: Name })
    .then((user) => {
      if (user) {
        console.log("user DELETED");
        res.json({ message: "User deleted" });
      } else {
        console.log("User not found");
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(500).json({ error: err.toString() });
    });
});

// Define Review model
let Review = mongoose.model(
  "ReviewCollection",
  new mongoose.Schema(
    {
      username: String,
      reviews: [
        {
          product_id: mongoose.Schema.Types.ObjectId,
          description: String,
          image: String, // Storing as base64 or URL
          rating: Number,
          date: { type: Date, default: Date.now },
        },
      ],
    },
    { collection: "ReviewCollection", timestamps: true },
  ),
);

// Create review endpoint
app.post("/Server/Review/Create", upload.any(), async (req, res) => {
  const { description } = req.body;
  const files = req.files;

  try {
    // Assuming you want to save a review for a particular user
    const username = "johndoe"; // Adjust as needed
    const user = await User.findOne({ username: username });

    if (!user) {
      console.log(`User with username ${username} not found`);
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new review document
    const newReview = {
      username: username,
      reviews: [
        {
          product_id: new mongoose.Types.ObjectId(), // Correct instantiation
          description: description,
          image:
            files.length > 0
              ? files.map((file) => file.buffer.toString("base64")).join(",")
              : null,
          rating: 5, // Example static rating
          date: new Date(), // Current date
        },
      ],
    };

    // Save the review document to ReviewCollection
    const reviewDoc = new Review(newReview);
    await reviewDoc.save();

    // Optionally, log the review document
    const updatedReview = await Review.findOne({ username: username });
    console.log("Document after save:", updatedReview);

    res.status(200).json({ message: "Review created successfully" });
  } catch (error) {
    console.error("Error creating review:", error);
    res
      .status(500)
      .json({ message: "Error creating review", error: error.message });
  }
});

// get review

// Fetch existing review
app.get("/Server/Review/Read/:reviewId", async (_req, res) => {
  try {
    const username = "johndoe"; // Use the correct username from session or request
    const reviewDoc = await Review.findOne({ username });
    if (!reviewDoc || reviewDoc.reviews.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Return the first review (modify as needed)
    const review = reviewDoc.reviews[0];
    res.status(200).json({
      description: review.description,
      image: review.image, // Assuming image is stored as base64
    });
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ message: "Error fetching review" });
  }
});

// Update review endpoint (using PUT)
app.put("/Server/Review/Update/:reviewId", upload.any(), async (req, res) => {
  const { description } = req.body;
  const files = req.files;
  const { reviewId } = req.params; // Assuming the review ID is passed as a parameter

  try {
    // // Assuming you're updating a review for a specific user
    // const testid="67173e23c95a010030ca515f"
    // // const user = await Review.findOne({ "reviews._id": reviewId });
    // const user = await Review.findOne({ testid});
    // console.log(user);
    // console.log(reviewId);
    // if (!user) {
    //   console.log("asdfa",user);
    //   console.log(reviewId);
    //   return res.status(404).json({ message: "Review not found",user,reviewId });
    // }

    const user = await Review.findOne({ "_id": reviewId });
    console.log("AAA");
    if (!user) {
      console.log("BBB");
      return res.status(404).json({ message: "Review not found" });
    }
    console.log("CCC",user);

    // Find the specific review by its ID and update its description and image
    const review = user.reviews[0];
    console.log("DDD",review.description);
    if (review) {
      review.description = description;
      // review.image =
      //   files.length > 0
      //     ? files.map((file) => file.buffer.toString("base64")).join(",")
      //     : review.image; // Update the image if new files are uploaded
    }

    console.log("EEE",review.description);
    console.log("FFF",user);

    await user.save(); // Save the changes to the user document
    res.status(200).json({ message: "Review updated successfully",user});
  } catch (error) {
    res.status(500).json({ message: "Error updating review", error });
  }
});

// Fetch all reviews
app.get("/Server/Review/ReadAll", async (_req, res) => {
  try {
    const reviews = await Review.find();
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }

    const allReviews = reviews.map((reviewDoc) => ({
      username: reviewDoc.username,
      reviewId: reviewDoc._id,
      reviews: reviewDoc.reviews.map((r) => ({
        product_id: r.product_id,
        description: r.description,
        image: r.image,
        rating: r.rating,
        date: r.date,
      })),
    }));

    res.status(200).json(allReviews);
    console.log("ajsdlfasdhf!");
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    res
      .status(500)
      .json({ message: "Error fetching reviews", error: error.message });
  }
});

// Delete a review by reviewId
app.delete("/Server/Review/Delete/:reviewId", async (req, res) => {
  const reviewId = req.params.reviewId; // Get reviewId from params
  const { username } = req.body; // Get username from request body

  console.log("Review ID:", reviewId);
  console.log("Username:", username);

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    console.log("Invalid review ID format");
    return res.status(400).json({ message: "Invalid review ID !backend" });
  }

  try {
    // Log the query to ensure it's looking for the correct document
    console.log(
      `Looking for Review document with username: ${username} and review ID: ${reviewId}`,
    );
    console.log(Review);
    console.log("sFBADSJHFAHJSD");

    // Find the Review document with matching username and embedded review ID
    const reviewDoc = await Review.findOne({ _id: reviewId });
    console.log(reviewDoc); // Check if each reviewDoc exists before trying to map over it

    if (!reviewDoc) {
      console.log("Review not found or unauthorized");
      return res
        .status(404)
        .json({ message: "Review not found or unauthorized" });
    }

    // Log the found document for verification
    // console.log('Review document found:', reviewDoc);
    console.log("asdjfhajsdhflkah");

    // Remove the review from the reviews array
    console.log("saldfkj", reviewDoc.reviews);
    const result = await Review.findByIdAndDelete(reviewId);
    console.log(result);

    // reviewDoc.reviews.remove();
    // await reviewDoc.save();

    console.log("Review deleted successfully");
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Error deleting review", error });
  }
});

// app.delete("/Server/Review/Delete/:id", async (req, res) => {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id))
//       return res.status(400).json({ message: "Invalid contact ID" });

//     try {
//       const result = await Review.findByIdAndDelete(id);
//       if (!result) return res.status(404).json({ message: "Contact not found" });

//       res.status(200).json({ message: "Contact deleted successfully" });
//     } catch (error) {
//       res.status(500).json({
//         message: "Error deleting contact message",
//         error: error.message,
//       });
//     }
//   });

///////////////////////////////////////////////////////////////////////////////////////////////// keyuren
// Define appointment model
const appointmentSchema = new mongoose.Schema(
  {
    username: String,
    appointments: [
      {
        product_id: mongoose.Schema.Types.ObjectId,
        name: String,
        mobileNum: String,
        service: String,
        date: Date,
      },
    ],
  },
  { collection: "Appointments", timestamps: true },
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

// Create Appointment
app.post("/Server/Appointment/Create", async (req, res) => {
  const { name, mobile, service, date } = req.body;
  try {
    const username = req.body.username || "defaultUser"; // Replace with actual logic

    const appointment = {
      product_id: new mongoose.Types.ObjectId(),
      name,
      mobileNum: mobile,
      service,
      date: new Date(date),
    };

    let appointmentDoc = await Appointment.findOne({ username });
    if (!appointmentDoc) {
      appointmentDoc = new Appointment({
        username,
        appointments: [appointment],
      });
    } else {
      appointmentDoc.appointments.push(appointment);
    }

    const savedAppointment = await appointmentDoc.save();
    const appointmentId = savedAppointment.appointments
      .slice(-1)[0]
      ._id.toString();

    res
      .status(200)
      .json({ message: "Appointment created successfully", appointmentId });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating appointment", error: error.message });
  }
});

app.get("/Server/Appointment/Read/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid appointment ID" });
  }

  try {
    const appointment = await Appointment.findOne({ "appointments._id": id });
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const appointmentDetails = appointment.appointments.id(id);
    appointmentDetails.date = appointmentDetails.date.toISOString();

    res.status(200).json(appointmentDetails);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching appointment", error: error.message });
  }
});

// Delete Appointment by ID
//   app.delete("/Server/Appointment/Delete/:id", async (req, res) => {
//     const { id } = req.params;
//     try {
//     //   const username = req.body.username || "defaultUser"; // Replace with actual logic
//     //   const appointment = await Appointment.findOne({
//     //     "appointments._id": id,
//     //     username: username,
//     //   });

//     const appointment = await Appointment.findOne({ "appointments._id": id });

//       if (!appointment) {
//         return res
//           .status(404)
//           .json({ message: "Appointment not found or unauthorized" });
//       }

//       console.log(appointment);
//       console.log(id);

//       const result1 = await Appointment.findByIdAndDelete(id);
//       console.log(result1);

//     //   appointment.appointments.id(id).remove();
//     //   await appointment.save();

//       res.status(200).json({ message: "Appointment deleted successfully" });
//     } catch (error) {
//       res
//         .status(500)
//         .json({ message: "Error deleting appointment", error: error.message });
//     }
//   });

app.delete("/Server/Appointment/Delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Find and update the document by pulling out the appointment from the array
    const result = await Appointment.updateOne(
      { "appointments._id": id },
      { $pull: { appointments: { _id: id } } },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting appointment", error: error.message });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////// hari

// Define appointment model

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now },
  },
  { collection: "Contacts" },
);

const Contact = mongoose.model("Contact", contactSchema);

// Contact routes
app.post("/Server/Contact/Create", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(200).json({ message: "Contact message received" });
  } catch (error) {
    res.status(500).json({
      message: "Error creating contact message",
      error: error.message,
    });
  }
});

app.get("/Server/Contact/ReadAll", async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0)
      return res.status(404).json({ message: "No contact messages found" });

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching contact messages",
      error: error.message,
    });
  }
});

app.delete("/Server/Contact/Delete/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Invalid contact ID" });

  try {
    const result = await Contact.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ message: "Contact not found" });

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting contact message",
      error: error.message,
    });
  }
});

app.get("/Test", async (_req, res) => {
  res.json({ Test: "Tesfgfft" });
});

/* USER REGISTRATION LOGIC */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const newUser = mongoose.model("User", UserSchema);

// User registration route
app.post("/User-register", async (req, res) => {
  const { username, email, password } = req.body;

  // Validation
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all fields." });
  }

  try {
    // Check if user already exists
    const existingUser = await newUser.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists." });
    }

    // Create a new user (storing plain password)
    const user = new newUser({
      username,
      email,
      password, // Store the plain password (not recommended for production)
    });

    await user.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully!" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// User login route
app.post("/user-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await newUser.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Send user data without sensitive information
    const { password: _, ...userData } = user.toObject();
    return res.status(200).json({ user: userData });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
});

app.get("/user-profile", (req, res) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  if (!userData) {
    return res.status(401).json({ message: "User not authenticated." });
  }
  res.json({ user: userData });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
