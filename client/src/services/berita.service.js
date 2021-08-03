import http from './http-common';

export const createBerita = async (judul, konten, kategori) => {
  try {
    const data = {
      judul_berita: judul,
      konten,
      kategori
    };
    const result = await http.post('/berita', data);
    return result.data;
  } catch (error) {
    return error;
  }
};

export const getAllBerita = async () => {
  try {
    const result = await http.get('/berita/all');
    return result.data;
  } catch (error) {
    return error;
  }
};

export const getBeritaByJudul = async (judul) => {
  try {
    const result = await http.get(`/berita`, {
      params: {
        judul_berita: judul
      }
    });
    return result.data;
  } catch (error) {
    return error;
  }
};

export const getBeritaById = async (id) => {
  try {
    const result = await http.get(`/berita/${id}`);
    return result.data;
  } catch (error) {
    return error;
  }
};

export const updateBerita = async (id, judul, konten, kategori) => {
  try {
    const data = {
      judul_berita: judul,
      konten,
      kategori
    };
    const result = await http.put(`/berita/${id}`, data);
    return result.data;
  } catch (error) {
    return error;
  }
};

export const deleteOneBerita = async (id) => {
  try {
    const result = await http.delete(`/berita/${id}`);
    return result.data;
  } catch (error) {
    return error;
  }
};

export const deleteAllBerita = async () => {
  try {
    const result = await http.delete(`/berita`);
    return result.data;
  } catch (error) {
    return error;
  }
};
