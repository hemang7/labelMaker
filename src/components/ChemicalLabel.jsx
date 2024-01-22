import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import ContentsSection from "./ContentsSection";
import InstructionsSection from "./InstructionsSection";
import { format } from "date-fns";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ChemicalLabel = () => {
  const componentRefs = useRef([]);

  const [chemicals, setChemicals] = useState([
    { chemicalName: "", volume: "", contents: [], temperature: "" },
  ]);

  const updateChemical = (index, updatedFields) => {
    const updatedChemicals = [...chemicals];
    updatedChemicals[index] = { ...updatedChemicals[index], ...updatedFields };
    return updatedChemicals;
  };

  const date = format(new Date(), "dd MMMM yyyy");

  const printStyle = `
    @page {
      margin: 20mm; /* Adjust the margin size as needed */
    }
    body {
      margin: 20mm; /* Adjust the margin size as needed */
    }
    @media print {
      /* Hide default header added by browser */
      @page {
        margin-top: 0;
      }
      body::before {
        content: "\\200B"; /* Zero-width space character to create an empty element */
        display: block;
        height: 10mm; /* Adjust the top margin size as needed */
        page-break-before: always; /* Ensure the top margin on the first page */
      }
      /* Hide default footer added by browser */
      @page {
        margin-bottom: 0;
      }
      body::after {
        content: "";
        display: block;
        height: 0;
      }
    }
  `;

  const addChemical = () => {
    setChemicals([
      ...chemicals,
      { chemicalName: "", volume: "", contents: [], temperature: "" },
    ]);
  };

  const deleteChemical = (index) => {
    const updatedChemicals = [...chemicals];
    updatedChemicals.splice(index, 1);
    setChemicals(updatedChemicals);
  };

  const downloadPDF = (index) => {
    const pdf = new jsPDF();
    pdf.addHTML(componentRefs.current[index], () => {
      pdf.save(`Chemical_Label_${index + 1}.pdf`);
    });
  };

  const downloadAllPDFs = () => {
    const pdf = new jsPDF();

    // Iterate over each chemical and add it to the PDF
    chemicals.forEach((chemical, index) => {
      // Add a new page for each chemical (except the first one)
      if (index !== 0) {
        pdf.addPage();
      }

      pdf.fromHTML(componentRefs.current[index], 10, 10, {
        width: 180,
      });
    });

    // Save the PDF
    pdf.save("All_Chemical_Labels.pdf");
  };
  return (
    <div className="max-w-2xl mx-auto p-4 border border-gray-300 rounded-lg mt-10">
      {chemicals.map((chemical, index) => (
        <div key={index} className="mt-4">
          <div className="mt-4" style={{ display: "none" }}>
            <div
              ref={(el) => (componentRefs.current[index] = el)}
              className="printable-content"
            >
              <div>
                <h1 className="text-2xl font-bold">{chemical.chemicalName}</h1>
                <p className="text-base">{`Volume: ${chemical.volume}`}</p>
                <p className="text-base">{date}</p>
              </div>

              <ContentsSection contents={chemical.contents} isPrintable />
              <InstructionsSection
                temperature={chemical.temperature}
                isPrintable
              />

              <div className=" text-lg font-bold">Tidal Grow Agriscience</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-red-500 text-white px-4 py-2"
              onClick={() => deleteChemical(index)}
            >
              Delete
            </button>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold mb-1 mt-1">
              Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300"
              value={chemical.chemicalName}
              onChange={(e) =>
                setChemicals(
                  updateChemical(index, { chemicalName: e.target.value })
                )
              }
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-semibold mb-1 mt-1">
              Volume
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300"
              value={chemical.volume}
              onChange={(e) =>
                setChemicals(updateChemical(index, { volume: e.target.value }))
              }
            />
          </div>
          <ContentsSection
            contents={chemical.contents}
            setContents={(newContents) =>
              setChemicals(updateChemical(index, { contents: newContents }))
            }
          />
          <div className="mt-4">
            <label className="block text-sm font-semibold mb-1 mt-1">
              Temperature
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300"
              value={chemical.temperature}
              onChange={(e) =>
                setChemicals(
                  updateChemical(index, { temperature: e.target.value })
                )
              }
            />
          </div>
          <div>
            <ReactToPrint
              trigger={() => (
                <button
                  className="bg-blue-500 text-white px-4 py-2 mt-5 rounded-lg mr-5"
                  onClick={() => downloadPDF(index)}
                >
                  Download PDF
                </button>
              )}
              content={() => componentRefs.current[index]}
              pageStyle={printStyle}
              documentTitle={`Chemical_Label_${index + 1}`}
              noHeaders
              noFooter
            />
            <button
              className="bg-green-500 rounded-lg text-white px-4 py-2 mt-4"
              onClick={addChemical}
            >
              Add Chemical
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChemicalLabel;
