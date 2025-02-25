import { motion } from "framer-motion";
// const MovieCard = ({ movie }) => {
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-4 ">
//         <img
//           src={movie.image}
//           alt={movie.title}
//           className="w-full h-64 object-cover rounded-lg"
//         />
//         <div className="mt-4">
//           <h2 className="text-lg font-bold">{movie.title}</h2>
//           <p className="text-gray-600">Year: {movie.year}</p>
//           <p className="text-gray-800 font-semibold">Rating: {movie.rating}</p>
//         </div>
//       </div>
//     );
//   };

const MovieCard = ({ movie }) => {
    return (
      <motion.div
        whileHover={{ scale: 1.10 }} // Scales up on hover
        whileTap={{ scale: 0.95 }}   // Scales down slightly on click
        className="bg-white rounded-2xl shadow-lg p-4 transition-transform duration-300"
      >
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="mt-4">
          <h2 className="text-lg font-bold">{movie.title}</h2>
          <p className="text-gray-600">Year: {movie.year}</p>
          <p className="text-gray-800 font-semibold">Rating: {movie.rating}</p>
        </div>
      </motion.div>
    );
  };
  
  export default MovieCard;
  