import React, { useEffect, useState, Fragment } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ImageUploader from "./ImageUploader/ImageUploader";
import { Dialog, Transition, RadioGroup, Listbox } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import dynamic from "next/dynamic";
import TextareaWithCharacterLimit from "./TextareaLimitation/TextareaLimitation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";

const DynamicQuillEditor = dynamic(() => import("./QuillEditor/QuillEditor"), {
  ssr: false, // This disables server-side rendering for this component
});

interface FormValues {
  missionTitle: string;
  missionImage: string;
  selectProduct: string;
  missionDescription: string;
  specialInstruction: string;
  startDate: Date;
  endDate: Date;
  location: string;
  collectionPoint: string;
  collectionDescription: string;
  minimumStored: number | "";
  minimumReturned: number | "";
  amountOfItems: number | "";
  totalRewards: number | "";
}

const validationSchema = Yup.object().shape({
  missionTitle: Yup.string().required("Mission Title Required"),
  missionDescription: Yup.string().required("Mission Description Required"),
  minimumStored: Yup.number()
    .typeError("Please enter a valid number")
    .required("Number is required"),
  minimumReturned: Yup.number()
    .typeError("Please enter a valid number")
    .required("Number is required"),
  totalRewards: Yup.number()
    .typeError("Please enter a valid number")
    .required("Number is required"),
  location: Yup.string().required("Location Required"),
});

const MissionCreation = () => {
  const product = [
    { name: "330ml Cans" },
    { name: "1,5L Plastic Bottles" },
    { name: "Water" },
  ];
  const [selectedOption, setSelectedOption] = useState(product[0]);

  const [editorValue, setEditorValue] = useState<string>("");
  const maxCharacters = 1000;
  const handleEditorChange = (value: string) => {
    setEditorValue(value);
  };

  const [specialInstruction, setSpecialInstruction] = useState("");

  const handleDescriptionChange = (value: string) => {
    setSpecialInstruction(value);
  };

  const [collectionDescription, setCollectionDescription] = useState("");

  const handleCollectionChange = (value: string) => {
    setCollectionDescription(value);
  };

  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0"); // Ensure double-digit day
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based, so add 1
  const year = currentDate.getFullYear().toString();

  const formattedDate = `${day}.${month}.${year}`;

  useEffect(() => {
    const datePickerWrappers: any = document.querySelectorAll(
      ".react-datepicker-wrapper",
    );

    datePickerWrappers.forEach((datePickerWrapper: any) => {
      datePickerWrapper.style.setProperty("width", "100%", "important");
    });
  }, []);

  return (
    <Formik
      initialValues={{
        missionTitle: "",
        missionImage: "",
        selectProduct: "",
        missionDescription: "",
        specialInstruction: "",
        startDate: currentDate,
        endDate: currentDate,
        location: "",
        collectionPoint: "",
        collectionDescription: "",
        minimumStored: "",
        minimumReturned: "",
        amountOfItems: "",
        totalRewards: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values: FormValues) => {}}
    >
      {({ values, touched, isValid, setFieldValue, errors }) => (
        <Form>
          <div className="w-full p-5">
            <div className="flex justify-between">
              <div className="mb-5 text-left font-primary text-3xl font-semibold text-graystrongest">
                Create a Mission
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-bordergray">
              <div className="col-span-2 mb-3 flex">
                <div className="mr-5 min-w-[280px]">
                  <div className="font-primary text-sm font-semibold text-graystrongest">
                    Mission Title
                  </div>
                  <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                    lipsum
                  </div>
                </div>
                <Field
                  type="text"
                  name="missionTitle"
                  placeholder="Example Mission Title"
                  className="mb-1 mt-1 w-full rounded-xl border border-bordergray bg-white px-3 py-2 text-base font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-bordergray">
              <div className="col-span-2 mb-4 mt-4 flex">
                <div className="mr-5 min-w-[280px]">
                  <div className="font-primary text-sm font-semibold text-graystrongest">
                    Title Image
                  </div>
                  <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                    Upload your title image of your mission
                  </div>
                </div>
                <ImageUploader
                  className="h-[126px]"
                  onImageUpload={(imageFile: File) =>
                    setFieldValue("missionImage", imageFile)
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-bordergray">
              <div className="col-span-2 mb-4 mt-4 flex">
                <div className="mr-5 min-w-[280px]">
                  <div className="font-primary text-sm font-semibold text-graystrongest">
                    Select Product
                  </div>
                  <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                    Select your created product to be collected
                  </div>
                </div>
                <Listbox value={selectedOption} onChange={setSelectedOption}>
                  <div className="relative mt-1 w-full">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left ring-1 ring-gray  ">
                      <span className="block truncate text-base text-darkgray">
                        {selectedOption.name}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronDownIcon
                          className="text-gray-400 h-5 w-5"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options
                        style={{ position: "relative", zIndex: 1 }}
                        className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                      >
                        {product.map((person, personIdx) => (
                          <Listbox.Option
                            key={personIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-primary bg-opacity-10 text-primary"
                                  : "text-gray-900"
                              }`
                            }
                            value={person}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {person.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-bordergray">
              <div className="col-span-2 mb-4 mt-4 flex">
                <div className="mr-5 min-w-[280px]">
                  <div className="font-primary text-sm font-semibold text-graystrongest">
                    Mission Description
                  </div>
                  <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                    Write a short introduction.
                  </div>
                </div>
                <DynamicQuillEditor
                  className="w-full font-primary text-sm font-normal text-graystrongest"
                  value={editorValue}
                  onChange={handleEditorChange}
                  placeholder="Our goal is to collect and recycle as many 330ml Coca Cola cans as possible to promote sustainable practices and reduce waste. By participating in this mission, you'll contribute to the conservation of valuable resources and protect the environment from unnecessary pollution."
                  maxCharacters={maxCharacters}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-bordergray">
              <div className="col-span-2 mb-4 mt-4 flex">
                <div className="mr-5 min-w-[280px]">
                  <div className="font-primary text-sm font-semibold text-graystrongest">
                    Special Instructions
                  </div>
                  <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                    Write your special instructions about your products.
                  </div>
                </div>
                <TextareaWithCharacterLimit
                  name="specialInstruction"
                  value={specialInstruction}
                  onChange={handleDescriptionChange}
                  placeholder="Do not bend, cut or smash the cans. Damaged cans will not be accepted."
                  maxCharacters={maxCharacters}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-bordergray">
              <div className="col-span-2 mb-4 mt-4 flex">
                <div className="mr-5 min-w-[280px]">
                  <div className="font-primary text-sm font-semibold text-graystrongest">
                    Duration
                  </div>
                  <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                    Enter your mission dates
                  </div>
                </div>
                <div className="mr-5 w-full">
                  <div className="font-primary text-sm font-medium text-graystrong">
                    From
                  </div>
                  <DatePicker
                    selected={values.startDate}
                    onChange={(date) => setFieldValue("startDate", date)}
                    placeholderText="25/06/2023"
                    className="mb-1 mt-1 flex w-full rounded-xl border border-bordergray bg-white px-3 py-2 text-sm font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                  />
                </div>
                <div className="w-full">
                  <div className="font-primary text-sm font-medium text-graystrong">
                    Until
                  </div>
                  <div className="flex">
                    <DatePicker
                      selected={values.endDate}
                      onChange={(date) => setFieldValue("endDate", date)}
                      placeholderText="N/A"
                      className="mb-1 mt-1 flex w-full rounded-l-xl border border-bordergray bg-white px-3 py-2 text-sm font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                    />
                    <div className="mb-1 mt-1 rounded-r-xl border border-bordergray px-3 py-2 font-primary text-sm font-medium text-graystrongest">
                      Disable
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-bordergray">
              <div className="col-span-2 mb-4 mt-4 flex">
                <div className="mr-5 min-w-[280px]">
                  <div className="font-primary text-sm font-semibold text-graystrongest">
                    Location
                  </div>
                  <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                    Enter the location of your mission
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex w-full">
                    <Field
                      type="text"
                      name="location"
                      placeholder="Example Country"
                      className="mb-1 mt-1 w-full rounded-l-xl border border-bordergray bg-white px-3 py-2 text-base font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                    />
                    <div className="mb-1 mt-1 flex w-full max-w-[223px] items-center rounded-r-xl border border-bordergray px-3 py-2 text-center font-primary text-sm font-medium text-graystrongest">
                      <Image
                        src="/assets/images/locationicon.svg"
                        alt="location"
                        width="24"
                        height="24"
                        style={{ marginRight: 10 }}
                        unoptimized
                      />
                      Available Worldwide
                    </div>
                  </div>
                  <div className="mt-2 flex w-fit rounded-xl border border-primary bg-[#ebf7f7] px-1 py-0.5 font-primary text-sm font-medium text-primary">
                    Paris, France
                    <Image
                      src="/assets/images/locationdelete.svg"
                      alt="location"
                      width="16"
                      height="16"
                      style={{ marginLeft: 5, cursor: "pointer" }}
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-bordergray">
              <div className="col-span-2 mb-4 mt-4 flex">
                <div className="mr-5 min-w-[280px]">
                  <div className="font-primary text-sm font-semibold text-graystrongest">
                    Collection Point
                  </div>
                  <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                    Enter collection point for your storers
                  </div>
                </div>
                <Field
                  type="text"
                  name="collectionPoint"
                  placeholder="Address"
                  className="mb-1 mt-1 w-full rounded-xl border border-bordergray bg-white px-3 py-2 text-base font-normal text-graystrongest focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-bordergray">
              <div className="col-span-2 mb-4 mt-4 flex">
                <div className="mr-5 min-w-[280px]">
                  <div className="font-primary text-sm font-semibold text-graystrongest">
                    Collection Point Description
                  </div>
                  <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                    Write your instructions about your collection point.
                  </div>
                </div>
                <TextareaWithCharacterLimit
                  name="collectionDescription"
                  value={collectionDescription}
                  onChange={handleCollectionChange}
                  placeholder="Open from 9-18:00 on weekdays. Closed on weekends.
                  Bring your items to the back entrance"
                  maxCharacters={maxCharacters}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-bordergray">
              <div className="col-span-2 mb-4 mt-4 flex">
                <div className="mr-5 min-w-[280px] max-w-[280px]">
                  <div className="font-primary text-sm font-semibold text-graystrongest">
                    Minimum Amount to be Stored
                  </div>
                  <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                    Set the minimum amount for collectors to complete before
                    storing the items
                  </div>
                </div>
                <Field
                  type="number"
                  name="minimumStored"
                  placeholder="10 Items"
                  className="mb-1 mt-1 w-full rounded-xl border border-bordergray bg-white px-3 py-2 text-base font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-bordergray">
              <div className="col-span-2 mb-4 mt-4 flex">
                <div className="mr-5 min-w-[280px] max-w-[280px]">
                  <div className="font-primary text-sm font-semibold text-graystrongest">
                    Minimum Amount to be Returned
                  </div>
                  <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                    Set the minimum amount for Storers to complete before
                    returning the items
                  </div>
                </div>
                <Field
                  type="number"
                  name="minimumReturned"
                  placeholder="1000 Items"
                  className="mb-1 mt-1 w-full rounded-xl border border-bordergray bg-white px-3 py-2 text-base font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-bordergray">
              <div className="col-span-2 mb-4 mt-4 flex">
                <div className="mr-5 min-w-[280px] max-w-[280px]">
                  <div className="font-primary text-sm font-semibold text-graystrongest">
                    Amount of Items
                  </div>
                  <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                    Total amount of Items you want to be returned
                  </div>
                </div>
                <Field
                  type="number"
                  name="amountOfItems"
                  placeholder="100,000"
                  className="mb-1 mt-1 w-full rounded-xl border border-bordergray bg-white px-3 py-2 text-base font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-bordergray">
              <div className="col-span-2 mb-4 mt-4 flex">
                <div className="mr-5 min-w-[280px] max-w-[280px]">
                  <div className="font-primary text-sm font-semibold text-graystrongest">
                    Rewards to be allocated
                  </div>
                  <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                    Total amount of money you allocate
                  </div>
                </div>
                <div className="relative w-full">
                  <div className="absolute left-3.5 top-3.5 font-primary text-base font-normal text-graystrongest">
                    $
                  </div>
                  <Field
                    type="number"
                    name="totalRewards"
                    placeholder="1,00"
                    className="mb-1 mt-1 w-full rounded-xl border border-bordergray bg-white py-2 pl-7 pr-24  text-base font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                  />
                  <div className="absolute right-3.5 top-3.5 font-primary text-base font-normal text-graystrongest">
                    Per Item
                  </div>
                </div>
              </div>
              <div className="col-span-1 mb-auto ml-5 mt-auto items-center font-primary text-sm font-semibold">
                = $100,000 in Total
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MissionCreation;
