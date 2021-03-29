import axios from "axios";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { randomNumber } from "../../src/utils/RandomNumber.js";
import GiphyGallery from "../../src/view/GiphyGallery.jsx";
import mockHttpResponse from "../utils/__mock__/mockHttpResponse.json";

jest.mock("axios");
jest.mock("../../src/utils/RandomNumber.js");

jest.useFakeTimers();

describe("GiphyGallery", () => {

  let container;
  beforeEach(async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(mockHttpResponse));
    randomNumber.mockImplementation(() => 1234);

    container = document.createElement("div");
    await act(async () => {
      render(
        <GiphyGallery />,
        container
      );
    });
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  /*eslint-disable */
  it("should render loading indicator first hand", () => {
    expect(container.innerHTML).toEqual(`<div class="container"><h1 class="text-center">` +
      `Welcome to Giphy Trending!</h1><div class="bg-light d-flex flex-wrap justify-content-evenly">` +
      `</div><div class="position-sticky bottom-0 bg-light d-flex justify-content-center">` +
      `<div class="spinner-grow text-primary" role="status"></div>` +
      `<div class="spinner-grow text-secondary" role="status"></div>` +
      `<div class="spinner-grow text-success" role="status"></div>` +
      `<div class="spinner-grow text-danger" role="status"></div>` +
      `<div class="spinner-grow text-warning" role="status"></div>` +
      `<div class="spinner-grow text-info" role="status"></div></div></div>`);
  });

  it("should render gifs after fetched", () => {
    act(() => jest.runAllTimers());
    expect(container.innerHTML).toEqual(`<div class="container"><h1 class="text-center">` +
      `Welcome to Giphy Trending!</h1><div class="bg-light d-flex flex-wrap justify-content-evenly">` +
      `<div class="col-6 col-md-4 col-lg-3 my-3"><div class="w-95 m-auto font-size-small">` +
      `<div class="d-flex flex-column bg-white shadow gif-card-fixed-height">` +
      `<div class="d-flex flex-grow-1 mx-auto overflow-hidden">` +
      `<img class="img-fluid gif-card-max-height p-2 cursor-pointer align-self-center fit-contain hover-scale transition-eio-3" ` +
      `src="https://media1.giphy.com/media/KD8Ldwzx90X9hi9QHW/200.webp?cid=1405890bvvaqtyx2ngrgzlcnsrztqed883xibfpiksp32ywj&amp;rid=200.webp"` +
      ` alt="Tired At Home GIF by IKEA USA"></div><div class="d-flex justify-content-between px-1 mb-1">` +
      `<span class="cursor-pointer text-black-50 text-hover-royalblue"><i class="bi bi-paperclip"></i></span>` +
      `<div><span class="me-3 cursor-pointer text-black-50 text-hover-royalblue"><i class="bi bi-eye-fill">1234</i>` +
      `</span><span class="me-3 cursor-pointer text-black-50 text-hover-royalblue"><i class="bi bi-chat-quote-fill">` +
      `1234</i></span><span class="pe-1 cursor-pointer text-black-50 text-hover-royalblue"><i class="bi bi-heart-fill">1234` +
      `</i></span></div></div></div><div class="mt-2 ms-2"><a class="text-decoration-none fw-bold cl-royalblue" ` +
      `href="https://giphy.com/IKEAUSA/" target="_blank" rel="noreferrer"><img class="max-height-1rem rounded-circle me-1"` +
      ` src="https://media4.giphy.com/avatars/IKEAUSA/cSMrv32MRdWa.png" alt="giphy author image">IKEAUSA</a></div>` +
      `</div></div><div class="col-6 col-md-4 col-lg-3 my-3"><div class="w-95 m-auto font-size-small">` +
      `<div class="d-flex flex-column bg-white shadow gif-card-fixed-height"><div class="d-flex flex-grow-1 mx-auto overflow-hidden">` +
      `<img class="img-fluid gif-card-max-height p-2 cursor-pointer align-self-center fit-contain hover-scale transition-eio-3" ` +
      `src="https://media4.giphy.com/media/WoifpFfPMrbQG875JC/200.webp?cid=1405890bvvaqtyx2ngrgzlcnsrztqed883xibfpiksp32ywj&amp;rid=200.webp"` +
      ` alt="Wake Up Sleeping GIF by The Creamlovers"></div><div class="d-flex justify-content-between px-1 mb-1">` +
      `<span class="cursor-pointer text-black-50 text-hover-royalblue"><i class="bi bi-paperclip"></i></span><div>` +
      `<span class="me-3 cursor-pointer text-black-50 text-hover-royalblue"><i class="bi bi-eye-fill">1234</i></span>` +
      `<span class="me-3 cursor-pointer text-black-50 text-hover-royalblue"><i class="bi bi-chat-quote-fill">1234</i></span>` +
      `<span class="pe-1 cursor-pointer text-black-50 text-hover-royalblue"><i class="bi bi-heart-fill">1234` +
      `</i></span></div></div></div><div class="mt-2 ms-2"><a class="text-decoration-none fw-bold cl-royalblue" ` +
      `href="https://giphy.com/Creamlovers/" target="_blank" rel="noreferrer"><img class="max-height-1rem rounded-circle me-1"` +
      ` src="https://media0.giphy.com/avatars/Creamlovers/5NOufBa97ZA6.gif" alt="giphy author image">Creamlovers` +
      `</a></div></div></div></div></div>`);
  });
  /*eslint-enable */
});
