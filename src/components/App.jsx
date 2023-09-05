import { Component } from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    articles: [],
    page: 1,
    queryState: '',
    isModalOpen: false,
    selectedImageUrl: '',
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        'https://pixabay.com/api/?key=38354710-a3d6b3af700cce2a78ac34292&q=yellow+flowers&image_type=photo&pretty=true&per_page=12'
      );
      this.setState({ articles: response.data.hits });
    } catch (error) {
      console.error('Something wrong. Please reload page.', error);
    }
  }

  handleSearch = async query => {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=38354710-a3d6b3af700cce2a78ac34292&q=${query}&image_type=photo&pretty=true&per_page=12`
      );
      this.setState({ articles: response.data.hits, queryState: query });
    } catch (error) {
      console.error('Something wrong. Please reload page.', error);
    }
  };
  loadMoreImages = async () => {
    const { page } = this.state;
    const nextPage = page + 1;

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=38354710-a3d6b3af700cce2a78ac34292&page=${nextPage}&q=${this.state.queryState}&image_type=photo&pretty=true&per_page=12`
      );

      if (response.data.hits.length > 0) {
        this.setState(prevState => ({
          articles: [...prevState.articles, ...response.data.hits],
          page: nextPage,
        }));
      }
    } catch (error) {
      console.error('Something wrong. Please reload page.', error);
    }
  };
  openModal = imageUrl => {
    this.setState({
      isModalOpen: true,
      selectedImageUrl: imageUrl,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      selectedImageUrl: '',
    });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery data={this.state.articles} openModal={this.openModal} />
        <Button onClick={this.loadMoreImages} />
        <Loader />
        <Modal
          isOpen={this.state.isModalOpen}
          onClose={this.closeModal}
          imageUrl={this.state.selectedImageUrl}
        />
      </div>
    );
  }
}
