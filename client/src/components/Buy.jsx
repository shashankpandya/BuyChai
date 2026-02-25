import { ethers } from "ethers";

const Buy = ({ state }) => {
  const buyChai = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    console.log(name, message, contract);

    try {
      const amount = { value: ethers.utils.parseEther("0.001") };

      const transaction = await contract.buyChai(name, message, amount);
      await transaction.wait();
      console.log("Chai purchased successfully");
      // Clear form after successful purchase
      document.querySelector("#name").value = "";
      document.querySelector("#message").value = "";
    } catch (error) {
      console.error("Error buying chai:", error);
      alert("Error buying chai: " + error.message);
    }
  };
  return (
    <>
      <p className="text-3xl font-serif text-center py-5 underline text-gray-200">
        BUY CHAI
      </p>
      <div className="bg-gray-500 text-gray-200 bg-opacity-50 shadow-xl rounded-lg py-10">
        <form onSubmit={buyChai}>
          <div className="mb-3 font-serif text-center px-80">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Your Name"
            />
          </div>
          <div className="mb-3 font-serif text-center items-center justify-center px-80">
            <label className="form-label">Message</label>
            <input
              type="text"
              className="form-control"
              id="message"
              placeholder="Enter Your Message"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary cursor-auto bg-green-600"
              disabled={!state.contract}
            >
              Buy Chai
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Buy;
