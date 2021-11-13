const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = async ({ to, url }) => {
  const msg = {
    from: "par14kour2@gmail.com",
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
    console.log(err.response.body.errors);
  }
};

module.exports = { sendWelcomeEmail };
