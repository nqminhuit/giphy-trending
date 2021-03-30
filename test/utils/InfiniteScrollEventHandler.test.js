import { fetchMoreGifs } from "../../src/utils/InfiniteScrollEventHandler.js";

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

it("should not scroll if client does not reach bottom page", async () => {
  const setLoading = jest.fn();
  const setCanFetch = jest.fn();
  const setAllGifs = jest.fn();
  const fetchGifs = jest.fn();
  const documentElement = { scrollTop: 53, scrollHeight: 1551, clientHeight: 1152 };
  const paging = { total_count: 100, count: 20, offset: 0 };
  fetchMoreGifs(paging, setAllGifs, setLoading, setCanFetch, fetchGifs, documentElement);
  return flushPromises().then(() => {
    expect(setLoading).toBeCalledTimes(0);
    expect(setCanFetch).toBeCalledTimes(0);
    expect(setAllGifs).toBeCalledTimes(0);
    expect(fetchGifs).toBeCalledTimes(0);
  });
});

it("should not scroll if api return the last offset of pagination", async () => {
  const setLoading = jest.fn();
  const setCanFetch = jest.fn();
  const setAllGifs = jest.fn();
  const fetchGifs = jest.fn();
  const documentElement = { scrollTop: 153, scrollHeight: 1551, clientHeight: 1152 };
  const paging = { total_count: 100, count: 20, offset: 80 };
  fetchMoreGifs(paging, setAllGifs, setLoading, setCanFetch, fetchGifs, documentElement);
  return flushPromises().then(() => {
    expect(setLoading).toBeCalledTimes(0);
    expect(setCanFetch).toBeCalledTimes(0);
    expect(setAllGifs).toBeCalledTimes(0);
    expect(fetchGifs).toBeCalledTimes(0);
  });
});

it("should fetch more gifs if client reaches bottom page", () => {
  const setLoading = jest.fn();
  const setCanFetch = jest.fn();
  const fetchGifs = jest.fn().mockImplementationOnce(
    () => Promise.resolve({ truncatedGifs: {}, pagination: { total_count: 100, count: 20, offset: 20 } })
  );
  const documentElement = { scrollTop: 149, scrollHeight: 1551, clientHeight: 1152 };
  const paging = { total_count: 100, count: 20, offset: 0 };
  fetchMoreGifs(paging, jest.fn(), setLoading, setCanFetch, fetchGifs, documentElement);
  return flushPromises().then(() => {
    expect(setLoading).toBeCalledTimes(1);
    expect(setLoading).toBeCalledWith(true);

    expect(setCanFetch).toBeCalledTimes(1);
    expect(setCanFetch).toBeCalledWith(false);

    expect(fetchGifs).toBeCalledTimes(1);
  });
});

it("should setAllGifs state if receive data", async () => {
  const setLoading = jest.fn();
  const setCanFetch = jest.fn();
  const setAllGifs = jest.fn();
  const fetchGifs = jest.fn().mockImplementationOnce(
    () => Promise.resolve({
      truncatedGifs: [{ testProperty: "dummy" }],
      pagination: { total_count: 100, count: 20, offset: 20 }
    })
  );
  const documentElement = { scrollTop: 149, scrollHeight: 1551, clientHeight: 1152 };
  const paging = { total_count: 100, count: 20, offset: 0 };
  fetchMoreGifs(paging, setAllGifs, setLoading, setCanFetch, fetchGifs, documentElement);

  return flushPromises().then(() => {
    expect(setLoading).toBeCalledTimes(1);
    expect(setLoading).toBeCalledWith(true);

    expect(setCanFetch).toBeCalledTimes(1);
    expect(setCanFetch).toBeCalledWith(false);

    expect(setAllGifs).toBeCalledTimes(1);
    expect(setAllGifs).toBeCalledWith(expect.any(Function));

    expect(fetchGifs).toBeCalledTimes(1);
  });
});
