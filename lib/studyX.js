import axios from "axios";
import Chance from "chance";
const chance = new Chance();

export default class StudyX{
  #email;

  constructor(inviteCode){
    this.#email = this.#get_email()
    this.inviteCode = inviteCode
  }

  #get_email = () => {
    let domains = [
      "zoomku.today",
      "typery.com",
      "mymailcr.com",
      "pagedangan.me",
      "cggup.com",
    ];

    let email = `${chance.first() + chance.last()}@${
      domains[Math.floor(Math.random() * domains.length)]
    }`;
    console.log("Email => ", email);
    return email
  }

  #get_between = (string, start, end) => {
    string = " " + string;
    let ini = string.indexOf(start);
    if (ini == 0) return "";
    ini += start.length;
    let len = string.indexOf(end, ini) - ini;
    return string.substr(ini, len);
  }
  
  #sendEmail = async () => {
    let headers = {
      "accept": "application/json, text/plain, */*",
      "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
      "content-type": "application/json;charset=UTF-8",
      "sec-ch-ua":
        '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
    };

    let data = {
      email: this.#email,
      type: "EMAIL_REGISTERS",
    };
  
    return await axios
      .post(
        "https://mapp.studyxapp.com/api/studyx/v5/cloud/login/send_email/",
        data,
        {
          headers,
        }
      )
      .then((res) => {
        if (JSON.stringify(res.data).includes("successfully"))
          console.log("Send verification => successfully!");
        else console.log("Send verification => failed!");
  
        return res.data;
      })
      .catch((err) => console.error(err));
  };
  
  #verifyEmail = async (code) => {
    let headers = {
      "accept": "application/json, text/plain, */*",
      "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
      "content-type": "application/json;charset=UTF-8",
      "sec-ch-ua":
        '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
    };

    let url =
      "https://mapp.studyxapp.com/api/studyx/v5/cloud/login/user/student_register_by_app";
  
    let data = {
      identifier: this.#email,
      credential: "Qwerty123@",
      code: code,
      identityType: "email",
      loginType: 2,
      platform: "webclient",
    };
  
    return await axios
      .post(url, data, { headers })
      .then((res) => {
        return {
          status: res.status,
          headers: res.headers,
        };
      })
      .catch((err) => console.error(err));
  };
  
  #login = async (token) => {
    let headers = {
      "accept": "application/json, text/plain, */*",
      "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
      "authorization": token,
      "content-type": "application/json;charset=UTF-8",
      "platform": "webclient",
      "sec-ch-ua":
        '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      token: token,
    };

    let url =
      "https://mapp.studyxapp.com/api/studyx/v5/cloud/login/user/perfectLogEduInfo";
    let data = {
      educationalLevelId: 4,
      inviteCode: this.inviteCode,
      identityType: "email",
      identifier: this.#email,
      schoolId: "undefined",
    };
  
    return await axios
      .post(url, data, {
        headers,
      })
      .then((res) => {
        console.log(
          res.status === 200 ? "Login => Successfully!" : "Login => Failed!"
        );
        return res.status;
      })
      .catch((err) => console.error(err));
  };
  
  #checkEmail = async () => {
    let domain = this.#email.split("@")[1];
    let mail = this.#email.split("@")[0];
  
    let headers = {
      "authority": "generator.email",
      "accept":
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "id-ID,id;q=0.9",
      "cache-control": "max-age=0",
      "cookie": `surl=${domain}/${mail}; embx=%5B%22${mail}%40${domain}%22%5D`,
      "sec-ch-ua":
        '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
    };
    let url = "https://generator.email/inbox9/";
  
    let reData = "";
    let count = 0;
  
    console.log("Waiting verification code!");
  
    while (
      !reData.includes(
        "Please use the verification code to complete your sign up:"
      )
    ) {
      await axios
        .get(url, { headers })
        .then((res) => (reData = res.data))
        .catch((err) => console.error(err));
      count++;
      if (count > 10) {
        reData = "Please use the verification code to complete your sign up:";
        console.error("Failed get verification code!");
      }
    }
  
    let verificationCode = this.#get_between(
      reData,
      "<br /><br /><strong>",
      "</strong>"
    );
    console.log("Verification code => ", verificationCode);
  
    return verificationCode;
  }

  run = async () => {
    let point = 0;
    let sendmail = await this.#sendEmail();

    if (JSON.stringify(sendmail).includes("successfully")) 
    {
      let codeOtp = await this.#checkEmail();
      let verify = await this.#verifyEmail(codeOtp);

      (await this.#login(verify.headers.token))
        ? (point += 200)
        : null;

    } else console.error("Failed send verification code!");
    
    console.log("Point => +", point, '\n');
  }
}
