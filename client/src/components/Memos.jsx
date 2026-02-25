import { useState, useEffect } from "react";

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  //   const [loading, setLoading] = useState(true);
  const { contract } = state;

  useEffect(() => {
    const memosMessage = async () => {
      try {
        const memos = await contract.getMemos();
        console.log("Fetched Memos: ", memos); // Debugging step
        setMemos(memos);
      } catch (error) {
        console.error("Error fetching memos:", error);
        setMemos([]);
      }
      // setLoading(false);
    };
    contract && memosMessage();
  }, [contract]);

  //   if (loading) {
  //     return <p>Loading messages...</p>;
  //   }

  return (
    <>
      <div className="max-w-4xl mx-auto mt-10 px-4">
        <p className="text-center text-2xl font-bold text-gray-800 mb-6">
          Messages
        </p>
        {memos.map((memo) => (
          <div
            className="bg-gray-600 shadow-md rounded-lg mb-4 p-6 hover:scale-105 hover:bg-gray-500 transition-colors duration-300 ease-in-out"
            key={memo.timestamp}
          >
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="bg-teal-900 text-white border border-gray-200 p-3 text-center font-semibold rounded-tl-lg">
                    {memo.name}
                  </td>
                  <td className="bg-teal-800 text-white border border-gray-200 p-3 text-center">
                    {memo.message}
                  </td>
                  <td className="bg-teal-700 text-white border border-gray-200 p-3 text-center">
                    {new Date(memo.timestamp * 1000).toLocaleString()}
                  </td>
                  <td className="bg-teal-600 text-white border border-gray-200 p-3 text-center rounded-tr-lg">
                    {memo.from}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
};

export default Memos;
