import doctorModel from "../modals/doctorModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const user = await doctorModel.findById(docId);

    await doctorModel.findByIdAndUpdate(docId, { available: !user.available });
    res.status(200).json({
      success: true,
      message: "Availability changed",
    });
  } catch (error) {
    console.log(error);
  }
};

const doctorList = async (req, res) => {
  try {
    const allDoctors = await doctorModel
      .find({})
      .select(["-password", "-email"]);
    res.status(200).json({
      success: true,
      allDoctors,
    });
  } catch (error) {
    console.log(error);
  }
};

export { changeAvailability, doctorList };
