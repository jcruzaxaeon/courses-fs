//  src\components\Test.js

const Test = () => {
   // ## GET, 200 - OK, api/courses
   // - Return all courses (include course-user)
   (async () => {
      try {
         const endpoint = 'courses';
         const method = 'GET';
         const url = `http://localhost:5000/api/${endpoint}`;
         const options = {
            method,
            headers: {},
         };

         const response = await fetch(url, options);
         console.log(await response.json());

      } catch (err) {
         console.log(err);
      }
   })();

   return (
      <h1>Main Page Test</h1>
   );
}

export default Test;