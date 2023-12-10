import * as fs from 'node:fs';
import * as path from 'node:path';
import * as process from 'node:process';

const DEBUG = false;
export const debug = (message: any) => {
	DEBUG && console.log(message);
};

export const writeFile = (
	outDir: string,
	fileName: string,
	fileContents: string,
) => {
	debug(outDir);
	debug(fileName);
	debug(fileContents);

	const dirOutput = path.join(process.cwd(), outDir);

	const dirContents = fs.readdirSync(dirOutput);
	debug(dirContents);

	const exportFileContents = () => fs.writeFileSync(
		path.join(dirOutput, fileName),
		fileContents,
	);

	exportFileContents();
};
