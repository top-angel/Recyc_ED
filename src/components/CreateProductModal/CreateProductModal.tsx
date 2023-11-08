import { Dialog, Transition, RadioGroup, Listbox } from "@headlessui/react";

import { AiFillPlusSquare, AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
import React, { useEffect, useState, Fragment } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ImageUploader from "./ImageUploader";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";

interface FormValues {
  productName: string;
  materialType: string;
  selectSize: string;
  materialSize: number | "";
  customMaterial: string;
  customMaterialSize: number | "";
}

const validationSchema = Yup.object().shape({
  productName: Yup.string().required("Product Name Required"),
  materialType: Yup.string().required("Material Type Required"),
  customMaterial: Yup.string().required("Custom Material Required"),
  selectSize: Yup.string().required("Material Size Selection Required"),
  materialSize: Yup.number()
    .typeError("Please enter a valid number")
    .required("Number is required"),
  customMaterialSize: Yup.number()
    .typeError("Please enter a valid number")
    .required("Number is required"),
});

const material = [
  { name: "other" },
  { name: "paper" },
  { name: "plastic" },
  { name: "wood" },
];

const people = [
  { name: "other" },
  { name: "12" },
  { name: "16" },
  { name: "24" },
];

export default function CreateProductModal() {
  let [isOpen, setIsOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(material[0]);
  const [customMaterial, setCustomMaterial] = useState("");
  const [selectedOption, setSelectedOption] = useState(people[0]);
  const [customMaterialSize, setCustomMaterialSize] = useState("");
  const router = useRouter();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="flex items-center gap-2 rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <Image
            src={`/assets/images/productmodalicon.svg`}
            alt="productmodal"
            width="24"
            height="24"
          />
          Create a Product
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle  transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex justify-between text-lg font-medium leading-6 text-textDarkBlue"
                  >
                    Create a Product
                    <AiOutlineClose
                      className="h-5 w-5 cursor-pointer hover:opacity-80"
                      onClick={closeModal}
                    />
                  </Dialog.Title>
                  <Formik
                    initialValues={{
                      productName: "",
                      materialType: "",
                      selectSize: "",
                      materialSize: "",
                      customMaterial: "",
                      customMaterialSize: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values: FormValues) => {}}
                  >
                    {({ values, touched, isValid, setFieldValue, errors }) => (
                      <Form>
                        <div className="w-full">
                          <div className="mt-5">
                            <div className="font-primary text-sm font-semibold text-graystrongest">
                              Product Name
                            </div>
                            <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                              Enter the name of your product (e.g 330ml coke
                              bottles)
                            </div>
                            <Field
                              type="text"
                              name="missionTitle"
                              placeholder="Example Product Name"
                              className="mb-1 mt-2 w-full rounded-xl border border-bordergray bg-white px-3 py-2 text-base font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                            />
                          </div>
                          <div className="mt-5">
                            <div className="font-primary text-sm font-semibold text-graystrongest">
                              Material Type
                            </div>
                            <div className="mb-2 font-primary text-sm font-normal text-graystrongest opacity-50">
                              Select your products material
                            </div>
                            <Listbox
                              value={selectedMaterial}
                              onChange={(newValue) => {
                                if (newValue.name === "other") {
                                  setSelectedMaterial(newValue);
                                } else {
                                  setSelectedMaterial(newValue);
                                  setCustomMaterial("");
                                }
                              }}
                            >
                              <div className="relative mt-1 w-full">
                                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left ring-1 ring-gray  ">
                                  <span className="block truncate text-base text-darkgray">
                                    {selectedMaterial.name}
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
                                    style={{
                                      position: "relative",
                                      zIndex: 1,
                                    }}
                                    className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                  >
                                    {material.map((material, materialIdx) => (
                                      <Listbox.Option
                                        key={materialIdx}
                                        className={({ active }) =>
                                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                              ? "bg-primary bg-opacity-10 text-primary"
                                              : "text-gray-900"
                                          }`
                                        }
                                        value={material}
                                      >
                                        {({ selected }) => (
                                          <>
                                            <span
                                              className={`block truncate ${
                                                selected
                                                  ? "font-medium"
                                                  : "font-normal"
                                              }`}
                                            >
                                              {material.name}
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
                            <Field
                              type="text"
                              name="customMaterial"
                              placeholder="Enter Custom Material"
                              className="mb-1 mt-2 w-full rounded-xl border border-bordergray bg-white px-3 py-2 text-base font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                            />
                          </div>
                          <div className="mt-5">
                            <div className="font-primary text-sm font-semibold text-graystrongest">
                              Material Size
                            </div>
                            <div className="mb-2 font-primary text-sm font-normal text-graystrongest opacity-50">
                              Enter the size of your product (e.g 400 ml)
                            </div>
                            <Field
                              type="text"
                              name="missionTitle"
                              placeholder="10"
                              className="mb-2 mt-0 w-full rounded-xl border border-bordergray bg-white px-3 py-2 text-base font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                            />
                            <Listbox
                              value={selectedOption}
                              onChange={(newValue) => {
                                if (newValue.name === "other") {
                                  setSelectedOption(newValue);
                                } else {
                                  setSelectedOption(newValue);
                                  setCustomMaterialSize("");
                                }
                              }}
                            >
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
                                    style={{
                                      position: "relative",
                                      zIndex: 1,
                                    }}
                                    className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                  >
                                    {people.map((person, personIdx) => (
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
                                                selected
                                                  ? "font-medium"
                                                  : "font-normal"
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
                            <Field
                              type="text"
                              name="customMaterialSize"
                              placeholder="Enter Custom Unit"
                              className="mb-1 mt-2 w-full rounded-xl border border-bordergray bg-white px-3 py-2 text-base font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                            />
                          </div>
                          <div className="mt-5">
                            <div className="font-primary text-sm font-semibold text-graystrongest">
                              Example Image
                            </div>
                            <div className="mb-2 font-primary text-sm font-normal text-graystrongest opacity-50">
                              Upload an example image of the product to guide
                              your collectors
                            </div>
                            <ImageUploader
                              className="h-[126px]"
                              onImageUpload={(imageFile: File) =>
                                setFieldValue("missionImage", imageFile)
                              }
                            />
                          </div>
                          <button
                            type="button"
                            className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                          >
                            <Image
                              src={`/assets/images/productmodalothericon.svg`}
                              alt="productmodalother"
                              width="24"
                              height="24"
                            />
                            Create a Product
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
