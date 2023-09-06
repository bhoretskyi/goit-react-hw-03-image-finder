import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { getImages } from './GetImages';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    queryState: '',
    isModalOpen: false,
    selectedImageUrl: '',
    isLoading: false,
    hasMoreImages: false,
  };

  async componentDidUpdate(prevProps, PrevState) {

    if (
      PrevState.queryState !== this.state.queryState ||
      PrevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      try {
        const images = await getImages(this.state.queryState, this.state.page);
        if (images.length > 0) {
          this.setState({ hasMoreImages: true });
        }
        if (images.length < 12) {
          this.setState({ hasMoreImages: false });
        }
        const processedImages = images.map(image => ({
          id: image.id,
          webformatURL: image.webformatURL,
          largeImageURL: image.largeImageURL,
        }));
        // this.setState({ images: processedImages });
        this.setState(prevState => ({
          images: [...prevState.images, ...processedImages],
        }));
      } catch (error) {
        console.log('Error.Please reload page');
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSearch = query => {
    this.setState({ page: 1, images: [], queryState: query });
  };

  loadMoreImages = async () => {
    const { page } = this.state;
    const nextPage = page + 1;
    this.setState({ page: nextPage });
  };

  openModal = imageUrl => {
    document.addEventListener('keydown', this.handleEscKeyPress);

    this.setState({
      isModalOpen: true,
      selectedImageUrl: imageUrl,
    });
  };

  closeModal = () => {
    document.removeEventListener('keydown', this.handleEscKeyPress);

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
