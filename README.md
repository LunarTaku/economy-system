![money-banner](https://user-images.githubusercontent.com/91988772/233615895-655a1667-0988-4780-b6fe-d5b46e5bd8e9.png)
# Want a bot of your own? Well now you can get one at https://shop.lunartaku.codes use code `hlNy6tl7` for 20% off your first order!

# economy-system
The repository contains the source code for a system that implements an economy system, allowing server owners to create a virtual currency for their community. The bot keeps track of each user's balance and allows them to earn and spend the currency through a variety of commands.

The project offers several customization options, such as adjusting the rate at which users can earn currency and setting up custom items for purchase with the virtual currency.

Overall, the "economy-system" repository is a useful tool for Discord server owners looking to add a fun and interactive element to their community, while also providing a valuable learning resource for developers looking to create their own Discord bots.

## How to setup
1. Put all the files in the `commands` folder into your command folder.
2. Put all theb files in `schemas` folder into your schemas folder.
3. Put all the files in `events` folder into your events folder.
4. Create a folder called functions and add the code below to your index.js file:
```js
fs.readdirSync("./src/functions").forEach((folder) => {
  fs.readdirSync(`./src/functions/${folder}`)
    .filter((files) => files.endsWith(".js"))
    .forEach((file) => {
      require(`./functions/${folder}/${file}`)(client);
    });
});
```
5. add all the folders in the `functions` folder in your folder.
6. Change all the paths to the correct ones.
7. Sit back, relax and enjoy!

## MongoDB Connection
1. Add the MongoDB URI into your `.env` file and name it `mongoUri`.
2. Put this in your ready.js file:
```js
    set("strictQuery", false);
    await connect(process.env.mongoUri).then(() => {
      console.log(`Connected to MongoDB!`);
    });
```

## Preview
https://user-images.githubusercontent.com/91988772/233617460-6a3bfa1d-b8f6-44d9-bb2b-e189f473f3bd.mp4

1. Fork the repository: To contribute to a GitHub project, you should first fork the repository by clicking the "Fork" button on the repository page. This will create a copy of the repository in your own account that you can modify and experiment with.

2. Clone the repository: After forking the repository, you should clone it to your local machine using Git. This can be done by running the git clone command followed by the URL of your forked repository.

3. Create a branch: Before making any changes to the code, you should create a new branch for your changes. This can be done using the git branch command followed by a descriptive name for your branch. Then, switch to the new branch using the git checkout command.

4. Make your changes: Now that you have a branch for your changes, you can modify the code as necessary. Make sure to follow any guidelines or conventions set forth by the project, such as code formatting, documentation, and testing.

5. Commit your changes: Once you have made your changes, you should commit them to your local branch using the git commit command. Make sure to write a clear and descriptive commit message that explains what changes you made.

6. Push your changes: After committing your changes locally, you should push them to your forked repository using the git push command.

7. Submit a pull request: Finally, you should submit a pull request to the original repository, requesting that your changes be merged into the main branch. Make sure to include a detailed description of your changes and any relevant information or documentation that may be helpful for the project maintainers.
