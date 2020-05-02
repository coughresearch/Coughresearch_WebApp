import React, { useState } from "react";

import "./MainForm.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTint,
  faTired,
  faHospitalUser,
  faHeartbeat,
  faThermometerFull,
  faSmoking,
  faLungsVirus,
  faHeadSideCoughSlash,
  faToiletPaper,
  faWind,
  faHeadSideVirus,
} from "@fortawesome/free-solid-svg-icons";

import Recording from "../Recording/Recording";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import { firebaseStorage } from "../firebase/firebase";
import { firebaseApp } from "../firebase/firebase";
import Loading from "../loader/loader";
import Swal from "sweetalert2";
import CustomizedSlider from "../Slider/Slider";
import { CopyToClipboard } from "react-copy-to-clipboard";
import heroImg from "./images/heroImg.png";
import moment from 'moment';

const MainForm = () => {
  const user_id = `contributer_${Date.now().toString()}`;
  const [sound, setSound] = useState();
  const [toggler, setToggler] = useState(false);
  //Form constant
  const [coronaStatus, setCoronaStatus] = useState("");
  const [age, setAge] = useState("");
  const [thermometer, setThermometer] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [bloodPressure, setBloodPressure] = useState(false);
  const [temprature, setTemprature] = useState("");
  const [sugarLevelValue, setSugarLevelValue] = useState("");
  const [bloodPressureValue, setBloodPressureValue] = useState("");
  //Dropdown Values
  const [fever, setFever] = useState("None");
  const [headache, setHeadache] = useState("None");
  const [fatigue, setFatigue] = useState("None");
  const [runnyNose, setRunnyNose] = useState("None");
  const [diarrehea, setDiarrehea] = useState("None");
  const [cough, setCough] = useState("None");
  const [sOfBreathing, setSOfBreathing] = useState("None");
  const [connectWCoronaP, setConnectWCoronaP] = useState("None");
  const [smoking, setSmoking] = useState("None");
  const [heartProblem, setHeartProblem] = useState("None");
  const [asthma, setAsthma] = useState("None");
  const [diabetesSlid, setDiabetesSlid] = useState("No");
  const [bloodPressureSlide, setBloodPressureSlide] = useState("Yes");
  const [copied, setCopied] = useState(false);

  const [loading, setLoading] = useState(false);
  const onSubmit = () => {
    var soundUrl = "";
    if (sound) {
      setLoading(true);
      //Audio Upload
      var uploadTask = firebaseStorage
        .child(`files/files/${Date.now().toString()}`)
        .put(sound.blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => { },
        (error) => {
          console.log("some error", error);
        },
        () => {
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then(function (downloadURL) {
              soundUrl = downloadURL;
              if (sound) {
                PostData();
              }
            })
            .catch((e) => console.log("some Error", e));
        }
      );
    } else {
      Swal.fire(
        "OOOPs",
        "Please record your cough sound, open in chrome browser if the recording is not working.",
        "error"
      );
    }
    const PostData = () => {
      firebaseApp
        .database()
        .ref("/patient" + Date.now().toString())
        .set({
          user_id: user_id,
          sound: soundUrl,
          coronaStatus: coronaStatus,
          age: age,
          thermometer: thermometer,
          diabetes: diabetes,
          bloodPressure: bloodPressure,
          temprature: temprature,
          sugarLevelValue: sugarLevelValue,
          bloodPressureValue: bloodPressureValue,
          fever: fever,
          headache: headache,
          fatigue: fatigue,
          runnyNose: runnyNose,
          diarrehea: diarrehea,
          cough: cough,
          shotnessOfBreathing: sOfBreathing,
          connectionWithCoronaPatient: connectWCoronaP,
          smoking: smoking,
          heartProblem: heartProblem,
          asthma: asthma,
          bloodPressureYesNo: bloodPressureSlide,
          diabetesYesNo: diabetesSlid,
          Date: moment().utcOffset("+05:30").format()
        })
        .then((c) => {
          setLoading(false);
          Swal.fire({
            title: "",
            html: `Stay Home and Join us in this fight against COVID-19 by sharing this app with
           your friend circle, doctors and social media. we are counting on you.<br/>`+
              `Doctors, Please support us in this research by providing COVID-19 patients cough sounds.<br/>` +
              `<b>Together, We can!</b>`, icon: 'success'
          })
        })
        .catch((e) => {
          console.log("something went wrong", e);
          setLoading(true);
          Swal.fire("OOOPs", "something went wrong", "error");
        });
    };
  };

  if (sound) {
    setTimeout(() => {
      setToggler(true);
    }, 0);
  }
  return (
    <>
      {loading && <Loading />}
      <div className="Form">
        <div className="Hero-Heading">
          <a href="https://www.coughresearch.ai" target="blank"><img src={heroImg} className="heroImage" alt="heroImage" /></a>
          <a href="https://www.coughresearch.ai" target="blank"><h1>Cough Research</h1></a>
          <a href="https://www.coughresearch.ai" target="blank" className="linkClass">www.coughresearch.ai</a>
          <div className="checkboxHeading  secondary-head">
            We respect your privacy and contribution. We do not collect any
            sensitive personal data (e.g., Name, Phone no, Email, Location) We are trying
            to build an app which can potentially detect COVID-19 using cough
            sound, fever and other vital information. We need your support and
            contribution in the project, Please help us in the fight against
            COVID-19 by filling the form with correct detail.
            <br />
            <div className="main-headin-center">
              Your contribution can save lives.
            </div>
          </div>
          {!toggler && (
            <div className="checkboxHeading recording-line">
              Click on the “record” button and cough three times after press
              Stop.
            </div>
          )}
        </div>
        {!toggler && (
          <div>
            <div className="Recorder">
              <Recording sound={sound} setSound={setSound} />
            </div>
            <span className="compatibility-issue">
              * Currently, we support only the Chrome browser.
            </span>
          </div>
        )}
        {sound && (
          <div className="Audio">
            <AudioPlayer
              autoPlay
              src={sound.blobURL}
              onPlay={(e) => {}}
            />
            <button
              className="Audio-button"
              onClick={() => {
                if (sound) {
                  setSound(false);
                  setToggler(false);
                }
              }}
            >
              Try Again
            </button>
          </div>
        )}
        <br />
        <div
          className="checkboxHeading"
          style={{
            marginBottom: "13px",
            marginTop: "-17px",
            paddingBottom: "10px",
          }}
        >
          I am{" "}
        </div>
        <div className="MainForm-Radio">
          <ul>
            <li>
              <input
                type="radio"
                id="f-option"
                name="selector"
                onChange={() => setCoronaStatus("covid positive")}
              />
              <label htmlFor="f-option">Tested and Covid Positive</label>

              <div className="check"></div>
            </li>

            <li>
              <input
                type="radio"
                id="s-option"
                name="selector"
                onChange={() => setCoronaStatus("covid negative")}
              />
              <label htmlFor="s-option">Tested and Covid Negative</label>

              <div className="check">
                <div className="inside"></div>
              </div>
            </li>
            <li>
              <input
                type="radio"
                id="x-option"
                name="selector"
                onChange={() => setCoronaStatus("waiting for result")}
              />
              <label htmlFor="x-option"> Waiting for Result</label>

              <div className="check">
                <div className="inside"></div>
              </div>
            </li>
            <li>
              <input
                type="radio"
                id="t-option"
                name="selector"
                onChange={() => setCoronaStatus("haven't tested yet")}
              />
              <label htmlFor="t-option">Haven't Tested Yet</label>

              <div className="check">
                <div className="inside"></div>
              </div>
            </li>
          </ul>
        </div>
        {coronaStatus === "waiting for result" ? (
          <div className="copyTextToClip">
            <div className="copytoClipboard">
              <span className="userId">{user_id}</span>
              <CopyToClipboard text={user_id} onCopy={() => setCopied(true)}>
                <button className="copyToclipButton">Copy</button>
              </CopyToClipboard>
            </div>
            {copied ? <span className="copied">Copied</span> : null}
            <div className="MainTextId">
              Please take the screenshot of this info and inform us about your
              result on <b>covid@coughresearch.ai</b> along with unique id or
              screenshot.
            </div>
          </div>
        ) : null}
        <input
          placeholder="Age in Years"
          className="Form-Input"
          type="number"
          onChange={(e) => setAge(e.target.value)}
          value={age}
        />

        <div className="checkboxHeading">
          Do you have access to any of these machines at home?
        </div>
        <div className="CheckBox_Flex">
          <label className="container-checkbox">
            Thermometer
            <input
              type="checkbox"
              checked={thermometer}
              onChange={() => setThermometer(!thermometer)}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        {thermometer ? (
          <input
            placeholder="Plese Share your Temprature in Fahrenheit"
            className="Form-Input"
            onChange={(e) => setTemprature(e.target.value)}
            value={temprature}
          />
        ) : null}

        <div className="CheckBox_Flex">
          <label className="container-checkbox">
            Diabetes Tester
            <input
              type="checkbox"
              checked={diabetes}
              onChange={() => setDiabetes(!diabetes)}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        {diabetes ? (
          <input
            placeholder="Share Suger Level"
            className="Form-Input"
            onChange={(e) => setSugarLevelValue(e.target.value)}
            value={sugarLevelValue}
          />
        ) : null}

        <div className="CheckBox_Flex">
          <label className="container-checkbox">
            Blood Pressure Monitor
            <input
              type="checkbox"
              checked={bloodPressure}
              onChange={() => setBloodPressure(!bloodPressure)}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        {bloodPressure ? (
          <input
            placeholder="Share your Blood Pressure"
            className="Form-Input"
            onChange={(e) => setBloodPressureValue(e.target.value)}
            value={bloodPressureValue}
          />
        ) : null}
        <div className="checkboxHeading" style={{ marginTop: "20px" }}>
          How are you feeling?
        </div>
        <div className="form-option">
          <div>
            <span className="icons">
              <FontAwesomeIcon icon={faThermometerFull} />
            </span>{" "}
            Fever{" "}
          </div>

          <div className="slider-length">
            <CustomizedSlider setValue={setFever} />
          </div>
        </div>

        <div className="form-option">
          <div>
            <span className="icons">
              <FontAwesomeIcon icon={faHeadSideVirus} />
            </span>{" "}
            Headache
          </div>

          <div className="slider-length">
            <CustomizedSlider setValue={setHeadache} />
          </div>
        </div>

        <div className="form-option">
          <div>
            <span className="icons">
              <FontAwesomeIcon icon={faTired} />
            </span>
            Fatigue or Tiredness
          </div>

          <div className="slider-length">
            <CustomizedSlider setValue={setFatigue} />
          </div>
        </div>

        <div className="form-option">
          <div>
            <span className="icons">
              <FontAwesomeIcon icon={faTint} />
            </span>{" "}
            Runny Nose
          </div>

          <div className="slider-length">
            <CustomizedSlider setValue={setRunnyNose} />
          </div>
        </div>

        <div className="form-option">
          <div>
            <span className="icons">
              <FontAwesomeIcon icon={faToiletPaper} />
            </span>{" "}
            Diarrehea
          </div>

          <div className="slider-length">
            <CustomizedSlider setValue={setDiarrehea} />
          </div>
        </div>

        <div className="form-option">
          <div>
            <span className="icons">
              <FontAwesomeIcon icon={faHeadSideCoughSlash} />
            </span>{" "}
            Cough
          </div>

          <div className="slider-length">
            <CustomizedSlider setValue={setCough} />
          </div>
        </div>

        <div className="form-option">
          <div>
            <span className="icons">
              <FontAwesomeIcon icon={faWind} />
            </span>{" "}
            Short of Breathing
          </div>

          <div className="slider-length">
            <CustomizedSlider setValue={setSOfBreathing} />
          </div>
        </div>

        <div className="form-option">
          <div>
            <span className="icons">
              <FontAwesomeIcon icon={faHospitalUser} />
            </span>{" "}
            Contacted With COVID Patient
          </div>

          <div className="slider-length">
            <CustomizedSlider setValue={setConnectWCoronaP} />
          </div>
        </div>

        <div className="form-option">
          <div>
            <span className="icons">
              <FontAwesomeIcon icon={faSmoking} />
            </span>{" "}
            Smoking
          </div>

          <div className="slider-length">
            <CustomizedSlider setValue={setSmoking} />
          </div>
        </div>

        <div className="form-option">
          <div>
            <span className="icons">
              <FontAwesomeIcon icon={faHeartbeat} />
            </span>{" "}
            Heart Problem
          </div>

          <div className="slider-length">
            <CustomizedSlider setValue={setHeartProblem} />
          </div>
        </div>
        <div className="form-option">
          <div>
            <span className="icons">
              <FontAwesomeIcon icon={faLungsVirus} />
            </span>{" "}
            Asthma
          </div>

          <div className="slider-length">
            <CustomizedSlider setValue={setAsthma} />
          </div>
        </div>
        <div className="form-option">
          <div>
            <span className="icons">
              <FontAwesomeIcon icon={faTint} />
            </span>{" "}
            Diabetes
          </div>

          <div className="slider-length">
            <CustomizedSlider setValue={setDiabetesSlid} YesNo={true} />
          </div>
        </div>
        <div className="form-option">
          <div>
            <span className="icons">
              <FontAwesomeIcon icon={faHeartbeat} />
            </span>{" "}
            Blood Pressure
          </div>

          <div className="slider-length">
            <CustomizedSlider setValue={setBloodPressureSlide} YesNo={true} />
          </div>
        </div>
        <button className="FormButton" onClick={onSubmit}>
          submit
          </button>
        <div>
          <div className="bottomHeading">TOGETHER, WE CAN!</div>
          <div className="bottomText">contact@coughresearch.ai</div>
        </div>
        <br />
        <br />
      </div>
    </>
  );
};

export default MainForm;
