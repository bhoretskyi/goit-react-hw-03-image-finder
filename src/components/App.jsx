import { Component } from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    queryState: '',
    isModalOpen: false,
    selectedImageUrl: '',
    isLoading: false,
    hasMoreImages: true,
  };

  async componentDidMount() {
    document.addEventListener('keydown', this.handleEscKeyPress);
    this.setState({ isLoading: true });
    try {
      const response = await axios.get(
        'https://pixabay.com/api/?key=38354710-a3d6b3af700cce2a78ac34292&q=yellow+flowers&image_type=photo&pretty=true&per_page=12'
      );
      this.setState({ images: response.data.hits });
    } catch (error) {
      console.error('Something wrong. Please reload page.', error);
    } finally {
      this.setState({ isLoading: false });
    }
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscKeyPress);
  }

  handleSearch = async query => {
    this.setState({ isLoading: true });
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=38354710-a3d6b3af700cce2a78ac34292&q=${query}&image_type=photo&pretty=true&per_page=12`
      );
      this.setState({
        images: response.data.hits,
        queryState: query,
        hasMoreImages: true,
      });
    } catch (error) {
      console.error('Something wrong. Please reload page.', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };
  loadMoreImages = async event => {
    console.log(event)

    event.preventDefault()
    this.setState({ isLoading: true });
    const { page } = this.state;
    const nextPage = page + 1;

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=38354710-a3d6b3af700cce2a78ac34292&page=${nextPage}&q=${this.state.queryState}&image_type=photo&pretty=true&per_page=12`
      );

      if (response.data.hits.length > 0) {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          page: nextPage,
          hasMoreImages: true,
        }));
      } else {
        this.setState({ hasMoreImages: false });
      }
    } catch (error) {
      console.error('Something wrong. Please reload page.', error);
    } finally {
      this.setState({ isLoading: false });
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
  handleEscKeyPress = e => {
    if (e.key === 'Escape' && this.state.isModalOpen) {
      this.closeModal();
    }
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSearch} />

        {this.state.isLoading ? (
          <Loader />
        ) : (
          <ImageGallery data={this.state.images} openModal={this.openModal} />
        )}
        {this.state.hasMoreImages ? (
          <Button onClick={this.loadMoreImages} />
        ) : null}

        <Modal
          isOpen={this.state.isModalOpen}
          onClose={this.closeModal}
          imageUrl={this.state.selectedImageUrl}
        />
      </div>
    );
  }
}
