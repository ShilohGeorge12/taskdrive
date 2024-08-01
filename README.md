# Task Drive

Welcome to the Task Drive! This project is a personalized web application designed to streamline task management and file organization, enhancing productivity through
intuitive features.

## Features

- **Task Prioritization**: Organize tasks by four priority levels: Urgent, Important, Must Do, and Normal.
- **Custom File Management**: Navigate, create, update, and delete folders, and upload various file types (e.g., PDFs, Word documents, audio, and video) with 3GB cloud
  storage.
- **Google Drive-Style Interface**: Enjoy a layout and functionality modeled after Google Drive, implemented from scratch using Next.js.
- **User Personalization**: Customize your dashboard to suit individual preferences and workflows.

## Technologies Used

- **Next.js**: Provides a powerful React framework for server-side rendering and static site generation.
- **TailwindCSS**: Utilized for styling and creating a responsive design with utility-first CSS.
- **MongoDB**: Serves as the database for storing task and file information.
- **TypeScript**: Ensures type safety and improved development experience.
- **TypeScript**: Storage Bucket for all files uploaded to Task Drive.

## Getting Started

Follow these instructions to set up the project locally:

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ShilohGeorge12/taskdrive.git
   cd taskdrive
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add the following variables:

   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_API_URL=your_api_url
   ```

4. **Run the Application**

   ```bash
   npm run dev
   ```

   Open [http://localhost:4550](http://localhost:4550) to view the application in your browser.

## Usage

1. **Task Management**: Create tasks and assign priority levels to organize your workload efficiently.
2. **File Management**: Upload and manage files within a Google Drive-style interface.
3. **Personalization**: Customize your dashboard layout and preferences to suit your needs.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request describing your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please contact [Shiloh George](mailto:shilohgeorge2019@gmail.com).
