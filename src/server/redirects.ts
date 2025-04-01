type Redirect = {
	source: string;
	destination: string;
	permanent: boolean;
};
const redirects: Redirect[] = [
	//   {
	//       source: "/url-to-redirect",
	//       destination: "/redirect-to-here",
	//       permanent: true,
	//   },
];

export default redirects;
