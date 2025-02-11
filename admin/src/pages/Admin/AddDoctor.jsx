import React, { useContext, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AdminContext } from "./../../context/AdminContext";
import { toast } from "react-toastify";
import axios, { formToJSON } from "axios";
import { AppContext } from "../../context/AppContext";

const AddDoctor = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address, setAddress] = useState("");
  const [about, setAbout] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);
  const { loading, setLoading } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!image) {
        return toast.error("Image not Selected");
      }
      if (!aToken) {
        return toast.error("Unauthorized User");
      }
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("degree", degree);
      formData.append("speciality", speciality);
      formData.append("address", address);
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });
      console.log(formToJSON(formData));
      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );

      if (!data.success) {
        toast.error(data.message);
        setLoading(false);

        return;
      } else {
        toast.success(data.message);
        setName("");
        setEmail("");
        setImage("");
        setPassword("");
        setDegree("");
        setAbout("");
        setAddress("");
        setFees("");
        setExperience("1 Year");
        setSpeciality("General physician");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-[1200px] h-[80vh] overflow-y-scroll">
      <h2 className="text-2xl">Add Doctor</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:p-8 gap-4 rounded sm:border border-slate-300"
      >
        {/* image header  */}
        <div className="flex  items-center gap-4">
          <label htmlFor="doc-img">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              className="w-20 h-20 cursor-pointer"
            />
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
            id="doc-img"
            required
          />
          <p className="w-40">Upload doctor picture</p>
        </div>
        {/* //form body */}
        <div className="flex flex-col gap-3">
          {/* //top content */}
          <div className="flex flex-col sm:flex-row gap-3 ">
            {/* //top left */}
            <div className="flex flex-col grow gap-4">
              <div className="flex flex-col gap-2">
                <label> Doctor Name</label>
                <input
                  type="text"
                  placeholder="name"
                  className="inpt"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label> Doctor Email</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="inpt"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label> Doctor Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="inpt"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>
                  {" "}
                  Doctor Experience <span className="text-xs">(number)</span>
                </label>
                <select
                  className="inpt"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  required
                >
                  <option value="1 Year">1 Year</option>
                  <option value="2 Years">2 Years</option>
                  <option value="3 Years">3 Years</option>
                  <option value="4 Years">4 Years</option>
                  <option value="5 Years">5 Years</option>
                  <option value="6 Years">6 Years</option>
                  <option value="7 Years">7 Years</option>
                  <option value="8 Years">8 Years</option>
                  <option value="9 Years">9 Years</option>
                  <option value="10+ Years">10+ Years</option>
                </select>
              </div>
            </div>
            {/* //top right */}
            <div className="flex flex-col grow gap-4">
              <div className="flex flex-col gap-2">
                <label>Speciality</label>
                <select
                  required
                  className="inpt"
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                >
                  <option value="General physician">General Physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label>Education</label>
                <input
                  type="text"
                  placeholder="education"
                  className="inpt"
                  required
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  className="inpt"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Fees</label>
                <input
                  type="number"
                  placeholder="Doctor Fees"
                  className="inpt"
                  min="0"
                  required
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* //bottom content */}
          <div className="flex grow flex-col gap-2">
            <label> About Doctor</label>
            <textarea
              type="text"
              placeholder="Tell us about yourself"
              className="inpt"
              required
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="btn bg-primary  text-white w-full max-w-50"
          row={5}
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
