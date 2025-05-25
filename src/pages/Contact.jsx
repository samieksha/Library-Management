import { useEffect, useState } from "react";
import { Form, useActionData } from "react-router-dom";
import { Modal } from "../components/UI/Modal";

export const contactData = async ({ request }) => {
  try {
    const res = await request.formData();
    const data = Object.fromEntries(res);

    return { success: true };
  } catch (error) {
    console.log(error.message);
    return { success: false };
  }
};

export const Contact = () => {
  const actionData = useActionData();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (actionData?.success) {
      setShowModal(true);
    }
  }, [actionData]);
  
  return (
    <>
      <section className="container ">
        <h2>Contact Us</h2>
        <p>
        Every great story begins with a question. Contact us today and let us help you find your next great read.
        </p>
        <br/><br/>
        <div className="section-contact">
          <div className=" grid grid-two--cols">
            <div className="contact-content">
              <Form method="POST">
                <div className="grid mb-3">
                  <div>
                    <label htmlFor="username">full name</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      required
                      autoComplete="off"
                      placeholder=""
                    />
                  </div>

                  <div>
                    <label htmlFor="email">email address</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      autoComplete="off"
                      placeholder=""
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="message">message</label>
                  <textarea
                    name="message"
                    id="message "
                    cols="30"
                    rows="10"
                    placeholder=""
                  ></textarea>
                </div>

                <div className="mt-3">
                  <button type="submit" className="btn contact-btn">
                    send message
                  </button>
                </div>
              </Form>
            </div>
            <div className="contact-image">
              <figure>
                <img
                  src="/contactUs.svg"
                  alt="contact pic"
                  className="contact_image"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>
      {showModal && (
        <Modal
          message= {`Thank you for reaching out! \n Our team has received it and will review it soon.`}
          onModalSubmit={() => setShowModal(false)}
        />
      )}
    </>
  );
};