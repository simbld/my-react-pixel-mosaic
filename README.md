# GameBoy Visual Filter Application

Welcome to the GameBoy Visual Filter Application! This project reimagines the classic GameBoy console from the 80s as a powerful photo filter tool. By leveraging the aesthetics and nostalgia of the GameBoy, this application applies various filters to your images, making them look like they were processed by this iconic handheld console.

## Features

- **ASCII Art Filter**: Converts your images into ASCII art using characters of varying density to represent different shades of gray.
- **Stippling Art Filter**: Applies a stippling effect, creating images composed of dots, reminiscent of pointillism.

## Filters

### ASCII Art Filter

The ASCII Art Filter transforms your image into a representation using ASCII characters. Here's the detailed logic:

1. **Pixel Traversal**:

   - The image is processed pixel by pixel, from left to right and top to bottom. Each pixel's color is analyzed.

2. **Grayscale Conversion**:

   - Each pixel's color is converted to grayscale using the formula: `(r + g + b) / 3`. This formula calculates the average brightness of the pixel, representing it as a single grayscale value.

3. **Character Selection**:

   - The `density` string contains a sequence of ASCII characters ordered from darkest to lightest: `"Ñ@#W$9876543210?!abc;:+=-,._ "`.
   - The brightness value of each pixel (ranging from 0 to 255) is mapped to an index in the `density` string using a mapping function. This determines the character that best represents the pixel's brightness.

4. **Image Representation**:
   - By repeating this process for each pixel and placing the corresponding ASCII characters in a grid format, we create an ASCII art representation of the original image.

### Stippling Art Filter

The Stippling Art Filter uses points to represent the image, creating a stippling effect. Here's how it works:

1. **Random Point Generation**:

   - The filter generates random points across the image, avoiding bright areas. This ensures that more points are placed in darker regions.

2. **Delaunay Triangulation and Voronoi Diagram**:

   - The generated points are used to calculate the Delaunay triangulation and Voronoi diagram, which help in determining the placement and density of the points.

3. **Centroid Calculation and Update**:

   - For each cell in the Voronoi diagram, the centroid (geometric center) is calculated and updated based on the brightness of the underlying pixels. This process iterates to refine the placement of the points.

4. **Final Drawing**:
   - The points are drawn on the canvas. Darker areas have a higher density of points, creating a stippled effect that represents the image.

## Usage

1. **Upload Your Image**:

   - Use the file input to upload the image you want to filter.

2. **Choose a Filter**:

   - Select either the ASCII Art Filter or the Stippling Art Filter.

3. **Apply the Filter**:

   - Click the "Apply Filter" button to see your image transformed by the selected filter.

4. **Save or Share**:
   - Once processed, you can save or share your filtered image.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type-safe JavaScript.
- **Vite**: For fast development and build process.
- **d3-delaunay**: For computational geometry used in the stippling filter.
- **Redux Toolkit**: For state management.
- **React Redux**: For integrating Redux with React.
- **Redux Thunk**: For asynchronous actions in Redux.
- **Redux Logger**: For logging Redux actions.
- **Redux Persist**: For persisting Redux state.
- **React Toastify**: For toast notifications.
- **LocalForage**: For offline storage.

Installation
Clone the repository:

sh
Copier le code
git clone <https://github.com/your-username/gameboy-visual-filter.git>
cd gameboy-visual-filter
Install dependencies:

sh
Copier le code
yarn install
Start the development server:

sh
Copier le code
yarn dev
Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. Ensure your code follows the existing style and passes all tests.

**_Enjoy transforming your photos with the nostalgic charm of the GameBoy Visual Filter Application!_**
