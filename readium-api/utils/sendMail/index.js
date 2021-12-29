const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sender = "par14kour2@gmail.com";

const sendWelcomeEmail = async ({ to, url }) => {
  const msg = {
    from: sender,
    to,
    subject: "Welcome to Readium",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html
      data-editor-version="2"
      class="sg-campaigns"
      xmlns="http://www.w3.org/1999/xhtml"
    >
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
        />
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
        <!--<![endif]-->
        <!--[if (gte mso 9)|(IE)]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG />
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        <![endif]-->
        <!--[if (gte mso 9)|(IE)]>
          <style type="text/css">
            body {
              width: 600px;
              margin: 0 auto;
            }
            table {
              border-collapse: collapse;
            }
            table,
            td {
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
            }
            img {
              -ms-interpolation-mode: bicubic;
            }
          </style>
        <![endif]-->
        <style type="text/css">
          body,
          p,
          div {
            font-family: arial, helvetica, sans-serif;
            font-size: 14px;
          }
          body {
            color: #000000;
          }
          body a {
            color: #1188e6;
            text-decoration: none;
          }
          p {
            margin: 0;
            padding: 0;
          }
          table.wrapper {
            width: 100% !important;
            table-layout: fixed;
            -webkit-font-smoothing: antialiased;
            -webkit-text-size-adjust: 100%;
            -moz-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
          img.max-width {
            max-width: 100% !important;
          }
          .column.of-2 {
            width: 50%;
          }
          .column.of-3 {
            width: 33.333%;
          }
          .column.of-4 {
            width: 25%;
          }
          ul ul ul ul {
            list-style-type: disc !important;
          }
          ol ol {
            list-style-type: lower-roman !important;
          }
          ol ol ol {
            list-style-type: lower-latin !important;
          }
          ol ol ol ol {
            list-style-type: decimal !important;
          }
          @media screen and (max-width: 480px) {
            .preheader .rightColumnContent,
            .footer .rightColumnContent {
              text-align: left !important;
            }
            .preheader .rightColumnContent div,
            .preheader .rightColumnContent span,
            .footer .rightColumnContent div,
            .footer .rightColumnContent span {
              text-align: left !important;
            }
            .preheader .rightColumnContent,
            .preheader .leftColumnContent {
              font-size: 80% !important;
              padding: 5px 0;
            }
            table.wrapper-mobile {
              width: 100% !important;
              table-layout: fixed;
            }
            img.max-width {
              height: auto !important;
              max-width: 100% !important;
            }
            a.bulletproof-button {
              display: block !important;
              width: auto !important;
              font-size: 80%;
              padding-left: 0 !important;
              padding-right: 0 !important;
            }
            .columns {
              width: 100% !important;
            }
            .column {
              display: block !important;
              width: 100% !important;
              padding-left: 0 !important;
              padding-right: 0 !important;
              margin-left: 0 !important;
              margin-right: 0 !important;
            }
            .social-icon-column {
              display: inline-block !important;
            }
          }
        </style>
        <!--user entered Head Start-->
        <!--End Head user entered-->
      </head>
      <body>
        <center
          class="wrapper"
          data-link-color="#1188E6"
          data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;"
        >
          <div class="webkit">
            <table
              cellpadding="0"
              cellspacing="0"
              border="0"
              width="100%"
              class="wrapper"
              bgcolor="#FFFFFF"
            >
              <tr>
                <td valign="top" bgcolor="#FFFFFF" width="100%">
                  <table
                    width="100%"
                    role="content-container"
                    class="outer"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                  >
                    <tr>
                      <td width="100%">
                        <table
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          border="0"
                        >
                          <tr>
                            <td>
                              <!--[if mso]>
        <center>
        <table><tr><td width="600">
      <![endif]-->
                              <table
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                                style="width: 100%; max-width: 600px;"
                                align="center"
                              >
                                <tr>
                                  <td
                                    role="modules-container"
                                    style="
                                      padding: 0px 0px 0px 0px;
                                      color: #000000;
                                      text-align: left;
                                    "
                                    bgcolor="#FFFFFF"
                                    width="100%"
                                    align="left"
                                  >
                                    <table
                                      class="module preheader preheader-hide"
                                      role="module"
                                      data-type="preheader"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="
                                        display: none !important;
                                        mso-hide: all;
                                        visibility: hidden;
                                        opacity: 0;
                                        color: transparent;
                                        height: 0;
                                        width: 0;
                                      "
                                    >
                                      <tr>
                                        <td role="module-content">
                                          <p>RIGGERS Travel & Adventure</p>
                                        </td>
                                      </tr>
                                    </table>
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      align="center"
                                      width="100%"
                                      role="module"
                                      data-type="columns"
                                      style="padding: 0px 0px 60px 0px;"
                                      bgcolor="#FFFFFF"
                                      data-distribution="1,1"
                                    >
                                      <tbody>
                                        <tr role="module-content">
                                          <td height="100%" valign="top">
                                            <table
                                              width="300"
                                              style="
                                                width: 300px;
                                                border-spacing: 0;
                                                border-collapse: collapse;
                                                margin: 0px 0px 0px 0px;
                                              "
                                              cellpadding="0"
                                              cellspacing="0"
                                              align="left"
                                              border="0"
                                              bgcolor=""
                                              class="column column-0"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style="
                                                      padding: 0px;
                                                      margin: 0px;
                                                      border-spacing: 0;
                                                    "
                                                  >
                                                    <table
                                                      class="wrapper"
                                                      role="module"
                                                      data-type="image"
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      width="100%"
                                                      style="table-layout: fixed;"
                                                      data-muid="f83d9204-1606-4de1-a10e-3e92ac0f9fa5"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            style="
                                                              font-size: 6px;
                                                              line-height: 10px;
                                                              padding: 0px 0px 0px
                                                                0px;
                                                            "
                                                            valign="top"
                                                            align="center"
                                                          >
                                                            <img
                                                              class="max-width"
                                                              border="0"
                                                              style="
                                                                display: block;
                                                                color: #000000;
                                                                text-decoration: none;
                                                                font-family: Helvetica,
                                                                  arial, sans-serif;
                                                                font-size: 16px;
                                                                max-width: 80% !important;
                                                                width: 80%;
                                                                height: auto !important;
                                                              "
                                                              width="240"
                                                              alt=""
                                                              data-proportionally-constrained="true"
                                                              data-responsive="true"
                                                              src="http://cdn.mcauto-images-production.sendgrid.net/a42392a1aea36a99/35d1aaf5-9de0-461f-9269-9e79174a5a95/1016x236.png"
                                                            />
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                    <table
                                                      class="module"
                                                      role="module"
                                                      data-type="text"
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      width="100%"
                                                      style="table-layout: fixed;"
                                                      data-muid="ffb4a968-f67f-4370-8c24-d00c8bdaaaff"
                                                      data-mc-module-version="2019-10-22"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            style="
                                                              padding: 40px 0px 0px
                                                                30px;
                                                              line-height: 35px;
                                                              text-align: inherit;
                                                            "
                                                            height="100%"
                                                            valign="top"
                                                            bgcolor=""
                                                            role="module-content"
                                                          >
                                                            <div>
                                                              <div
                                                                style="
                                                                  font-family: inherit;
                                                                  text-align: left;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family: helvetica,
                                                                      sans-serif;
                                                                    font-size: 40px;
                                                                  "
                                                                  ><strong
                                                                    >THANK YOU
                                                                    FOR
                                                                    REGISTER</strong
                                                                  ></span
                                                                >
                                                              </div>
                                                              <div></div>
                                                            </div>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            <table
                                              width="300"
                                              style="
                                                width: 300px;
                                                border-spacing: 0;
                                                border-collapse: collapse;
                                                margin: 0px 0px 0px 0px;
                                              "
                                              cellpadding="0"
                                              cellspacing="0"
                                              align="left"
                                              border="0"
                                              bgcolor=""
                                              class="column column-1"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style="
                                                      padding: 0px;
                                                      margin: 0px;
                                                      border-spacing: 0;
                                                    "
                                                  >
                                                    <table
                                                      class="wrapper"
                                                      role="module"
                                                      data-type="image"
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      width="100%"
                                                      style="table-layout: fixed;"
                                                      data-muid="310d916e-21da-4835-b221-8d57f8e2faed"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            style="
                                                              font-size: 6px;
                                                              line-height: 10px;
                                                              padding: 5px 0px 0px
                                                                0px;
                                                            "
                                                            valign="top"
                                                            align="center"
                                                          >
                                                            <img
                                                              class="max-width"
                                                              border="0"
                                                              style="
                                                                display: block;
                                                                color: #000000;
                                                                text-decoration: none;
                                                                font-family: Helvetica,
                                                                  arial, sans-serif;
                                                                font-size: 16px;
                                                                max-width: 100% !important;
                                                                width: 100%;
                                                                height: auto !important;
                                                              "
                                                              width="300"
                                                              alt=""
                                                              data-proportionally-constrained="true"
                                                              data-responsive="true"
                                                              src="http://cdn.mcauto-images-production.sendgrid.net/a42392a1aea36a99/a120f497-f9ac-417c-9057-a2e7450d0e94/1974x1481.jfif"
                                                            />
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                    <table
                                                      class="module"
                                                      role="module"
                                                      data-type="text"
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      width="100%"
                                                      style="table-layout: fixed;"
                                                      data-muid="ffb4a968-f67f-4370-8c24-d00c8bdaaaff.1"
                                                      data-mc-module-version="2019-10-22"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            style="
                                                              padding: 20px 0px 0px
                                                                0px;
                                                              line-height: 24px;
                                                              text-align: inherit;
                                                            "
                                                            height="100%"
                                                            valign="top"
                                                            bgcolor=""
                                                            role="module-content"
                                                          >
                                                            <div>
                                                              <div
                                                                style="
                                                                  font-family: inherit;
                                                                  text-align: inherit;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-size: 16px;
                                                                    font-family: arial,
                                                                      helvetica,
                                                                      sans-serif;
                                                                  "
                                                                  >Start now on the journey to read and share your knowledge by <a href="${url}">click this verification link!</a></span
                                                                >
                                                              </div>
                                                              <div></div>
                                                            </div>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table
                                      class="module"
                                      role="module"
                                      data-type="divider"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="table-layout: fixed;"
                                      data-muid="c95632b9-5775-448b-9043-4c1d7bfd1eef"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            style="padding: 0px 0px 0px 400px;"
                                            role="module-content"
                                            height="100%"
                                            valign="top"
                                            bgcolor=""
                                          >
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              align="center"
                                              width="100%"
                                              height="1px"
                                              style="
                                                line-height: 1px;
                                                font-size: 1px;
                                              "
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style="
                                                      padding: 0px 0px 1px 0px;
                                                    "
                                                    bgcolor="#000000"
                                                  ></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <div
                                      data-role="module-unsubscribe"
                                      class="module"
                                      role="module"
                                      data-type="unsubscribe"
                                      style="
                                        color: #000000;
                                        font-size: 12px;
                                        line-height: 20px;
                                        padding: 30px 5px 16px 16px;
                                        text-align: right;
                                      "
                                      data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"
                                    >
                                      <div class="Unsubscribe--addressLine">
                                        <p
                                          class="Unsubscribe--senderName"
                                          style="
                                            font-family: georgia, serif;
                                            font-size: 12px;
                                            line-height: 20px;
                                          "
                                        >
                                          John Leo
                                        </p>
                                      </div>
                                    </div>
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="module"
                                      data-role="module-button"
                                      data-type="button"
                                      role="module"
                                      style="table-layout: fixed;"
                                      width="100%"
                                      data-muid="fa2ff517-ee76-43cd-87ab-236a7e44e0b9"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            align="center"
                                            bgcolor=""
                                            class="outer-td"
                                            style="padding: 20px 0px 20px 0px;"
                                          >
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              class="wrapper-mobile"
                                              style="text-align: center;"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    align="center"
                                                    bgcolor="#F5F8FD"
                                                    class="inner-td"
                                                    style="
                                                      border-radius: 6px;
                                                      font-size: 16px;
                                                      text-align: center;
                                                      background-color: inherit;
                                                    "
                                                  >
                                                    <a
                                                      href="https://sendgrid.com/"
                                                      style="
                                                        background-color: #f5f8fd;
                                                        border: 1px solid #f5f8fd;
                                                        border-color: #f5f8fd;
                                                        border-radius: 25px;
                                                        border-width: 1px;
                                                        color: #a8b9d5;
                                                        display: inline-block;
                                                        font-size: 10px;
                                                        font-weight: normal;
                                                        letter-spacing: 0px;
                                                        line-height: normal;
                                                        padding: 5px 18px 5px 18px;
                                                        text-align: center;
                                                        text-decoration: none;
                                                        border-style: solid;
                                                        font-family: helvetica,
                                                          sans-serif;
                                                      "
                                                      target="_blank"
                                                      >♥ POWERED BY TWILIO
                                                      SENDGRID</a
                                                    >
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                              <!--[if mso]>
                                      </td>
                                    </tr>
                                  </table>
                                </center>
                                <![endif]-->
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </center>
      </body>
    </html>
    `,
  };

  try {
    // await sgMail.send(msg);
  } catch (err) {
    console.log(err);
  }
};

const sendResetPasswordEmail = async ({ to, url }) => {
  const msg = {
    from: sender,
    to,
    subject: "Reset Your Password",
    html: `<!DOCTYPE html>
    <html
      lang="en"
      xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:v="urn:schemas-microsoft-com:vml"
    >
      <head>
        <title></title>
        <meta charset="utf-8" />
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        <!--[if mso
          ]><xml
            ><o:OfficeDocumentSettings
              ><o:PixelsPerInch>96</o:PixelsPerInch
              ><o:AllowPNG /></o:OfficeDocumentSettings></xml
        ><![endif]-->
        <style>
          * {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            padding: 0;
          }
          th.column {
            padding: 0;
          }
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
          }
          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
          }
          p {
            line-height: inherit;
          }
          @media (max-width: 620px) {
            .icons-inner {
              text-align: center;
            }
            .icons-inner td {
              margin: 0 auto;
            }
            .row-content {
              width: 100% !important;
            }
            .stack .column {
              width: 100%;
              display: block;
            }
          }
        </style>
      </head>
      <body
        style="
          margin: 0;
          background-color: #091548;
          padding: 0;
          -webkit-text-size-adjust: none;
          text-size-adjust: none;
        "
      >
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          class="nl-container"
          role="presentation"
          style="
            mso-table-lspace: 0;
            mso-table-rspace: 0;
            background-color: #091548;
          "
          width="100%"
        >
          <tbody>
            <tr>
              <td>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-1"
                  role="presentation"
                  style="
                    mso-table-lspace: 0;
                    mso-table-rspace: 0;
                    background-color: #091548;
                    background-image: url(https://user-images.githubusercontent.com/87081336/141651745-75e0a56f-e2e6-4ebb-9348-5c159aa245ca.png);
                    background-position: center top;
                    background-repeat: repeat;
                  "
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="
                            mso-table-lspace: 0;
                            mso-table-rspace: 0;
                            color: #000;
                          "
                          width="600"
                        >
                          <tbody>
                            <tr>
                              <th
                                class="column"
                                style="
                                  mso-table-lspace: 0;
                                  mso-table-rspace: 0;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  padding-left: 10px;
                                  padding-right: 10px;
                                  padding-top: 5px;
                                  padding-bottom: 15px;
                                  border-top: 0;
                                  border-right: 0;
                                  border-bottom: 0;
                                  border-left: 0;
                                "
                                width="100%"
                              >
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="image_block"
                                  role="presentation"
                                  style="mso-table-lspace: 0; mso-table-rspace: 0;"
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      style="
                                        width: 100%;
                                        padding-right: 0;
                                        padding-left: 0;
                                        padding-top: 8px;
                                      "
                                    >
                                      <div
                                        align="center"
                                        style="line-height: 10px;"
                                      >
                                        <img
                                          alt="Main Image"
                                          src="https://user-images.githubusercontent.com/87081336/141651741-98b69939-5073-4a34-b310-0fcfba8688c9.png"
                                          style="
                                            display: block;
                                            height: auto;
                                            border: 0;
                                            width: 232px;
                                            max-width: 100%;
                                          "
                                          title="Main Image"
                                          width="232"
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="text_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0;
                                    mso-table-rspace: 0;
                                    word-break: break-word;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      style="
                                        padding-bottom: 15px;
                                        padding-top: 10px;
                                      "
                                    >
                                      <div style="font-family: sans-serif;">
                                        <div
                                          style="
                                            font-size: 14px;
                                            mso-line-height-alt: 16.8px;
                                            color: #fff;
                                            line-height: 1.2;
                                            font-family: Varela Round, Trebuchet MS,
                                              Helvetica, sans-serif;
                                          "
                                        >
                                          <p
                                            style="
                                              margin: 0;
                                              font-size: 14px;
                                              text-align: center;
                                            "
                                          >
                                            <span style="font-size: 30px;"
                                              >Reset Your Password</span
                                            >
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="5"
                                  cellspacing="0"
                                  class="text_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0;
                                    mso-table-rspace: 0;
                                    word-break: break-word;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td>
                                      <div style="font-family: sans-serif;">
                                        <div
                                          style="
                                            font-size: 14px;
                                            mso-line-height-alt: 21px;
                                            color: #fff;
                                            line-height: 1.5;
                                            font-family: Varela Round, Trebuchet MS,
                                              Helvetica, sans-serif;
                                          "
                                        >
                                          <p
                                            style="
                                              margin: 0;
                                              font-size: 14px;
                                              text-align: center;
                                            "
                                          >
                                            We received a request to reset your
                                            password. Don’t worry,
                                          </p>
                                          <p
                                            style="
                                              margin: 0;
                                              font-size: 14px;
                                              text-align: center;
                                            "
                                          >
                                            we are here to help you.
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="button_block"
                                  role="presentation"
                                  style="mso-table-lspace: 0; mso-table-rspace: 0;"
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      style="
                                        padding-bottom: 20px;
                                        padding-left: 15px;
                                        padding-right: 15px;
                                        padding-top: 20px;
                                        text-align: center;
                                      "
                                    >
                                      <div align="center">
                                        <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://www.example.com/" style="height:42px;width:197px;v-text-anchor:middle;" arcsize="58%" stroke="false" fillcolor="#ffffff"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#091548; font-family:sans-serif; font-size:15px"><!
                                        [endif]--><a
                                          href="${url}"
                                          style="
                                            text-decoration: none;
                                            display: inline-block;
                                            color: #091548;
                                            background-color: #fff;
                                            border-radius: 24px;
                                            width: auto;
                                            border-top: 1px solid #fff;
                                            border-right: 1px solid #fff;
                                            border-bottom: 1px solid #fff;
                                            border-left: 1px solid #fff;
                                            padding-top: 5px;
                                            padding-bottom: 5px;
                                            font-family: Varela Round, Trebuchet MS,
                                              Helvetica, sans-serif;
                                            text-align: center;
                                            mso-border-alt: none;
                                            word-break: keep-all;
                                          "
                                          target="_blank"
                                          ><span
                                            style="
                                              padding-left: 25px;
                                              padding-right: 25px;
                                              font-size: 15px;
                                              display: inline-block;
                                              letter-spacing: normal;
                                            "
                                            ><span
                                              style="
                                                font-size: 16px;
                                                line-height: 2;
                                                word-break: break-word;
                                                mso-line-height-alt: 32px;
                                              "
                                              ><span
                                                data-mce-style="font-size: 15px; line-height: 30px;"
                                                style="
                                                  font-size: 15px;
                                                  line-height: 30px;
                                                "
                                                ><strong
                                                  >RESET MY PASSWORD</strong
                                                ></span
                                              ></span
                                            ></span
                                          ></a
                                        >><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="divider_block"
                                  role="presentation"
                                  style="mso-table-lspace: 0; mso-table-rspace: 0;"
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      style="
                                        padding-bottom: 15px;
                                        padding-left: 10px;
                                        padding-right: 10px;
                                        padding-top: 10px;
                                      "
                                    >
                                      <div align="center">
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          style="
                                            mso-table-lspace: 0;
                                            mso-table-rspace: 0;
                                          "
                                          width="60%"
                                        >
                                          <tr>
                                            <td
                                              class="divider_inner"
                                              style="
                                                font-size: 1px;
                                                line-height: 1px;
                                                border-top: 1px solid #5a6ba8;
                                              "
                                            >
                                              <span> </span>
                                            </td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="text_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0;
                                    mso-table-rspace: 0;
                                    word-break: break-word;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      style="
                                        padding-bottom: 40px;
                                        padding-left: 25px;
                                        padding-right: 25px;
                                        padding-top: 10px;
                                      "
                                    >
                                      <div style="font-family: sans-serif;">
                                        <div
                                          style="
                                            font-size: 14px;
                                            mso-line-height-alt: 21px;
                                            color: #7f96ef;
                                            line-height: 1.5;
                                            font-family: Varela Round, Trebuchet MS,
                                              Helvetica, sans-serif;
                                          "
                                        >
                                          <p
                                            style="
                                              margin: 0;
                                              font-size: 14px;
                                              text-align: center;
                                            "
                                          >
                                            <strong
                                              >Didn’t request a password
                                              reset?</strong
                                            >
                                          </p>
                                          <p
                                            style="
                                              margin: 0;
                                              font-size: 14px;
                                              text-align: center;
                                            "
                                          >
                                            You can safely ignore this message.
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-2"
                  role="presentation"
                  style="mso-table-lspace: 0; mso-table-rspace: 0;"
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="
                            mso-table-lspace: 0;
                            mso-table-rspace: 0;
                            color: #000;
                          "
                          width="600"
                        >
                          <tbody>
                            <tr>
                              <th
                                class="column"
                                style="
                                  mso-table-lspace: 0;
                                  mso-table-rspace: 0;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  padding-left: 10px;
                                  padding-right: 10px;
                                  padding-top: 15px;
                                  padding-bottom: 15px;
                                  border-top: 0;
                                  border-right: 0;
                                  border-bottom: 0;
                                  border-left: 0;
                                "
                                width="100%"
                              >
                                <table
                                  border="0"
                                  cellpadding="5"
                                  cellspacing="0"
                                  class="image_block"
                                  role="presentation"
                                  style="mso-table-lspace: 0; mso-table-rspace: 0;"
                                  width="100%"
                                >
                                  <tr>
                                    <td>
                                      <div
                                        align="center"
                                        style="line-height: 10px;"
                                      >
                                        <img
                                          alt="Readium"
                                          src="http://cdn.mcauto-images-production.sendgrid.net/a42392a1aea36a99/35d1aaf5-9de0-461f-9269-9e79174a5a95/1016x236.png"
                                          style="
                                            display: block;
                                            height: auto;
                                            border: 0;
                                            width: 145px;
                                            max-width: 100%;
                                          "
                                          title="Readium"
                                          width="145"
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="divider_block"
                                  role="presentation"
                                  style="mso-table-lspace: 0; mso-table-rspace: 0;"
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      style="
                                        padding-bottom: 15px;
                                        padding-left: 10px;
                                        padding-right: 10px;
                                        padding-top: 15px;
                                      "
                                    >
                                      <div align="center">
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          style="
                                            mso-table-lspace: 0;
                                            mso-table-rspace: 0;
                                          "
                                          width="60%"
                                        >
                                          <tr>
                                            <td
                                              class="divider_inner"
                                              style="
                                                font-size: 1px;
                                                line-height: 1px;
                                                border-top: 1px solid #5a6ba8;
                                              "
                                            >
                                              <span> </span>
                                            </td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  class="social_block"
                                  role="presentation"
                                  style="mso-table-lspace: 0; mso-table-rspace: 0;"
                                  width="100%"
                                >
                                  <tr>
                                    <td>
                                      <table
                                        align="center"
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="social-table"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0;
                                          mso-table-rspace: 0;
                                        "
                                        width="156px"
                                      >
                                        <tr>
                                          <td style="padding: 0 10px 0 10px;">
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                              ><img
                                                alt="Facebook"
                                                height="32"
                                                src="https://user-images.githubusercontent.com/87081336/141651739-012cf30b-0a2e-476b-bf6f-122aef3f1c44.png"
                                                style="
                                                  display: block;
                                                  height: auto;
                                                  border: 0;
                                                "
                                                title="Facebook"
                                                width="32"
                                            /></a>
                                          </td>
                                          <td style="padding: 0 10px 0 10px;">
                                            <a
                                              href="https://instagram.com/"
                                              target="_blank"
                                            >
                                              <img
                                                alt="Instagram"
                                                height="32"
                                                src="https://user-images.githubusercontent.com/87081336/141651742-41d1f874-5b7e-404b-a46a-78632dbd5286.png"
                                                style="
                                                  display: block;
                                                  height: auto;
                                                  border: 0;
                                                "
                                                title="Instagram"
                                                width="32"
                                            /></a>
                                          </td>
                                          <td style="padding: 0 10px 0 10px;">
                                            <a
                                              href="https://twitter.com/"
                                              target="_blank"
                                              ><img
                                                alt="Twitter"
                                                height="32"
                                                src="https://user-images.githubusercontent.com/87081336/141651744-d258de32-6991-4296-856f-8c024fa65dda.png"
                                                style="
                                                  display: block;
                                                  height: auto;
                                                  border: 0;
                                                "
                                                title="Twitter"
                                                width="32"
                                            /></a>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="15"
                                  cellspacing="0"
                                  class="text_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0;
                                    mso-table-rspace: 0;
                                    word-break: break-word;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td>
                                      <div style="font-family: sans-serif;">
                                        <div
                                          style="
                                            font-size: 12px;
                                            font-family: Varela Round, Trebuchet MS,
                                              Helvetica, sans-serif;
                                            mso-line-height-alt: 14.399999999999999px;
                                            color: #4a60bb;
                                            line-height: 1.2;
                                          "
                                        >
                                          <p
                                            style="
                                              margin: 0;
                                              font-size: 12px;
                                              text-align: center;
                                            "
                                          >
                                            <span style=""
                                              >Copyright © 2021 Your Brand, All
                                              rights reserved.<br /><br />Where to
                                              find us: 2047 Roosevelt Road</span
                                            >
                                          </p>
                                          <p
                                            style="
                                              margin: 0;
                                              font-size: 12px;
                                              text-align: center;
                                            "
                                          >
                                            <span style=""
                                              ><br />Changed your mind? You can
                                              <a
                                                href="http://www.example.com"
                                                rel="noopener"
                                                style="
                                                  text-decoration: underline;
                                                  color: #7f96ef;
                                                "
                                                target="_blank"
                                                title="unsubscribe"
                                                >unsubscribe</a
                                              >
                                              at any time.</span
                                            >
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="html_block"
                                  role="presentation"
                                  style="mso-table-lspace: 0; mso-table-rspace: 0;"
                                  width="100%"
                                >
                                  <tr>
                                    <td>
                                      <div
                                        align="center"
                                        style="
                                          font-family: Varela Round, Trebuchet MS,
                                            Helvetica, sans-serif;
                                        "
                                      >
                                        <div style="height-top: 20px;"></div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-3"
                  role="presentation"
                  style="mso-table-lspace: 0; mso-table-rspace: 0;"
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="
                            mso-table-lspace: 0;
                            mso-table-rspace: 0;
                            color: #000;
                          "
                          width="600"
                        >
                          <tbody>
                            <tr>
                              <th
                                class="column"
                                style="
                                  mso-table-lspace: 0;
                                  mso-table-rspace: 0;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  padding-top: 5px;
                                  padding-bottom: 5px;
                                  border-top: 0;
                                  border-right: 0;
                                  border-bottom: 0;
                                  border-left: 0;
                                "
                                width="100%"
                              >
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="icons_block"
                                  role="presentation"
                                  style="mso-table-lspace: 0; mso-table-rspace: 0;"
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      style="
                                        color: #9d9d9d;
                                        font-family: inherit;
                                        font-size: 15px;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        text-align: center;
                                      "
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0;
                                          mso-table-rspace: 0;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td style="text-align: center;">
                                            <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                                            <!--[if !vml]><!--><table
                                              cellpadding="0"
                                              cellspacing="0"
                                              class="icons-inner"
                                              role="presentation"
                                              style="
                                                mso-table-lspace: 0;
                                                mso-table-rspace: 0;
                                                display: inline-block;
                                                margin-right: -4px;
                                                padding-left: 0;
                                                padding-right: 0;
                                              "
                                            ><!--<![endif]-->
                                              <tr>
                                                <td
                                                  style="
                                                    text-align: center;
                                                    padding-top: 5px;
                                                    padding-bottom: 5px;
                                                    padding-left: 5px;
                                                    padding-right: 6px;
                                                  "
                                                >
                                                  <a
                                                    href="https://www.designedwithbee.com/"
                                                    ><img
                                                      align="center"
                                                      alt="Designed with BEE"
                                                      class="icon"
                                                      height="32"
                                                      src="https://user-images.githubusercontent.com/87081336/141651737-15bf7bfd-946c-415a-b13b-7a13474ab5c5.png"
                                                      style="
                                                        display: block;
                                                        height: auto;
                                                        border: 0;
                                                      "
                                                      width="34"
                                                  /></a>
                                                </td>
                                                <td
                                                  style="
                                                    font-family: Varela Round,
                                                      Trebuchet MS, Helvetica,
                                                      sans-serif;
                                                    font-size: 15px;
                                                    color: #9d9d9d;
                                                    vertical-align: middle;
                                                    letter-spacing: undefined;
                                                    text-align: center;
                                                  "
                                                >
                                                  <a
                                                    href="https://www.designedwithbee.com/"
                                                    style="
                                                      color: #9d9d9d;
                                                      text-decoration: none;
                                                    "
                                                    >Designed with BEE</a
                                                  >
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- End -->
      </body>
    </html>
    `,
  };

  try {
    // await sgMail.send(msg);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sendWelcomeEmail, sendResetPasswordEmail };
