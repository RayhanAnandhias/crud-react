import React, { Component } from 'react';
import { createBerita } from '../services/berita.service';

class AddBerita extends Component {
  constructor(props) {
    super(props);
    this.onChangeJudul = this.onChangeJudul.bind(this);
    this.onChangeKonten = this.onChangeKonten.bind(this);
    this.onChangeKategori = this.onChangeKategori.bind(this);
    this.saveBerita = this.saveBerita.bind(this);
    this.newBerita = this.newBerita.bind(this);

    this.state = {
      id: null,
      judul: '',
      konten: '',
      kategori: '',
      submitted: false
    };
  }

  onChangeJudul(e) {
    this.setState({
      judul: e.target.value
    });
  }

  onChangeKonten(e) {
    this.setState({
      konten: e.target.value
    });
  }

  onChangeKategori(e) {
    this.setState({
      kategori: e.target.value
    });
  }

  async saveBerita() {
    const judul = this.state.judul;
    const konten = this.state.konten;
    const kategori = this.state.kategori;

    const result = await createBerita(judul, konten, kategori);
    console.log(result);
    this.setState({
      id: result.id,
      judul: result.judul_berita,
      konten: result.konten,
      kategori: result.kategori,
      submitted: true
    });
  }

  newBerita() {
    this.setState({
      id: null,
      judul: '',
      konten: '',
      kategori: '',
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newBerita}>
              Oke
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4 col-6">
              <h2>Tambah Data Berita</h2>
            </div>
            <div className="form-group col-6">
              <label htmlFor="judul">Judul</label>
              <input
                type="text"
                className="form-control"
                id="judul"
                required
                value={this.state.judul}
                onChange={this.onChangeJudul}
                name="judul"
              />
            </div>

            <div className="form-group col-6">
              <label htmlFor="konten">Konten</label>
              <input
                type="text"
                className="form-control"
                id="konten"
                required
                value={this.state.konten}
                onChange={this.onChangeKonten}
                name="konten"
              />
            </div>

            <div className="form-group col-6">
              <label htmlFor="kategori">Kategori</label>
              <input
                type="text"
                className="form-control"
                id="kategori"
                required
                value={this.state.kategori}
                onChange={this.onChangeKategori}
                name="kategori"
              />
            </div>

            <div className="mt-4 col-6">
              <button
                onClick={this.saveBerita}
                className="btn btn-success float-right ml-2"
              >
                Submit
              </button>
              <button
                onClick={this.newBerita}
                className="btn btn-secondary float-right"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AddBerita;
