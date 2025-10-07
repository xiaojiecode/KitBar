import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";
import App from "@/App";
import Index from "@/components/ToolGrid";

const ComponentPreviews = () => {
	return (
		<Previews palette={<PaletteTree/>}>
			<ComponentPreview path="/App">
				<App/>
			</ComponentPreview>
			<ComponentPreview path="/Index">
				<Index/>
			</ComponentPreview>
		</Previews>
	);
};

export default ComponentPreviews;