import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  getAllBerita,
  deleteAllBerita,
  getBeritaByJudul
} from '../services/berita.service';

class ListBerita extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchJudul = this.onChangeSearchJudul.bind(this);
    this.retrieveBerita = this.retrieveBerita.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveBerita = this.setActiveBerita.bind(this);
    this.removeAllBerita = this.removeAllBerita.bind(this);
    this.searchJudul = this.searchJudul.bind(this);

    this.state = {
      listBerita: [],
      currentBerita: null,
      currentIndex: -1,
      searchJudul: ''
    };
  }

  componentDidMount() {
    this.retrieveBerita();
  }

  onChangeSearchJudul(e) {
    const searchJudul = e.target.value;
    this.setState({
      searchJudul: searchJudul
    });
  }

  async retrieveBerita() {
    const result = await getAllBerita();
    console.log(result);
    this.setState({
      listBerita: result
    });
  }

  async refreshList() {
    await this.retrieveBerita();
    this.setState({
      currentBerita: null,
      currentIndex: -1
    });
  }

  setActiveBerita(berita, index) {
    this.setState({
      currentBerita: berita,
      currentIndex: index
    });
  }

  async removeAllBerita() {
    const result = await deleteAllBerita();
    console.log(result);
    await this.refreshList();
  }

  async searchJudul() {
    const judul = this.state.searchJudul;
    const result = await getBeritaByJudul(judul);
    console.log(result);
    this.setState({
      listBerita: result,
      currentBerita: null,
      currentIndex: -1
    });
  }

  render() {
    const { searchJudul, listBerita, currentBerita, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchJudul}
              onChange={this.onChangeSearchJudul}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchJudul}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Daftar Berita</h4>

          <ul className="list-group">
            {listBerita &&
              listBerita.map((berita, index) => (
                <li
                  className={
                    'list-group-item ' +
                    (index === currentIndex ? 'active' : '')
                  }
                  onClick={() => this.setActiveBerita(berita, index)}
                  key={index}
                >
                  {berita.judul_berita}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllBerita}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentBerita ? (
            <div>
              <h4>Berita</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{' '}
                {currentBerita.judul_berita}
              </div>
              <div>
                <label>
                  <strong>Konten:</strong>
                </label>{' '}
                {currentBerita.konten}
              </div>
              <div>
                <label>
                  <strong>Kategori:</strong>
                </label>{' '}
                {currentBerita.kategori}
              </div>

              <Link
                to={'/berita/' + currentBerita.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on Berita...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ListBerita;
