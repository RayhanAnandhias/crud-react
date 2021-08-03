import React, { Component } from 'react';
import {
  getBeritaById,
  updateBerita,
  deleteOneBerita
} from '../services/berita.service';

class Berita extends Component {
  constructor(props) {
    super(props);
    this.onChangeJudul = this.onChangeJudul.bind(this);
    this.onChangeKonten = this.onChangeKonten.bind(this);
    this.onChangeKategori = this.onChangeKategori.bind(this);
    this.getBerita = this.getBerita.bind(this);
    this.updateBerita = this.updateBerita.bind(this);
    this.deleteBerita = this.deleteBerita.bind(this);

    this.state = {
      currentBerita: {
        id: null,
        judul_berita: '',
        konten: '',
        kategori: ''
      },
      message: ''
    };
  }

  componentDidMount() {
    this.getBerita(this.props.match.params.id);
  }

  onChangeJudul(e) {
    const judul = e.target.value;

    this.setState(function (prevState) {
      return {
        currentBerita: {
          ...prevState.currentBerita,
          judul_berita: judul
        }
      };
    });
  }

  onChangeKonten(e) {
    const konten = e.target.value;

    this.setState((prevState) => ({
      currentBerita: {
        ...prevState.currentBerita,
        konten: konten
      }
    }));
  }

  onChangeKategori(e) {
    const kategori = e.target.value;

    this.setState((prevState) => ({
      currentBerita: {
        ...prevState.currentBerita,
        kategori: kategori
      }
    }));
  }

  async getBerita(id) {
    const result = await getBeritaById(id);
    console.log(result);
    this.setState({
      currentBerita: result
    });
  }

  async updateBerita() {
    const curId = this.state.currentBerita.id;
    const curBerita = this.state.currentBerita;
    const result = await updateBerita(
      curId,
      curBerita.judul_berita,
      curBerita.konten,
      curBerita.kategori
    );
    console.log(result);
    this.setState({
      message: 'Berita was updated successfully!'
    });
  }

  async deleteBerita() {
    const curId = this.state.currentBerita.id;
    const result = await deleteOneBerita(curId);
    console.log(result);
    this.props.history.push('/');
  }

  render() {
    const { currentBerita } = this.state;

    return (
      <div>
        {currentBerita ? (
          <div className="edit-form">
            <h4>Berita</h4>
            <form>
              <div className="form-group">
                <label htmlFor="judul">Judul</label>
                <input
                  type="text"
                  className="form-control"
                  id="judul"
                  value={currentBerita.judul_berita}
                  onChange={this.onChangeJudul}
                />
              </div>
              <div className="form-group">
                <label htmlFor="konten">Konten</label>
                <input
                  type="text"
                  className="form-control"
                  id="konten"
                  value={currentBerita.konten}
                  onChange={this.onChangeKonten}
                />
              </div>
              <div className="form-group">
                <label htmlFor="kategori">Kategori</label>
                <input
                  type="text"
                  className="form-control"
                  id="kategori"
                  value={currentBerita.kategori}
                  onChange={this.onChangeKategori}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteBerita}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateBerita}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on Berita...</p>
          </div>
        )}
      </div>
    );
  }
}

export default Berita;
