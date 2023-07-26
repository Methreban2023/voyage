import instance from "..";

const getAllTrips = async () => {
  const res = await instance.get("/trip");
  return res.data;
};

const getTripById = async (id) => {
  const res = await instance.get(`/trip/${id}`);
  return res.data;
};

const createTrip = async (data) => {
  const formData = new FormData();

  for (const key in data) {
    if (key != "image") {
      formData.append(key, data[key]);
    }
  }

  formData.append("image", {
    name: data.image,
    type: "image/jpeg",
    uri: data.image,
  });

  const res = await instance.post("/trip", formData);
  return res.data;
};

export { getAllTrips, getTripById, createTrip };
