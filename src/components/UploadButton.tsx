import React from 'react';
import { readAsDataURL } from '../lib/file'

export interface UploadedFileData { name: string, url: string }
export interface UploadButtonProps { handleUpload: (data: UploadedFileData) => void; }
export interface UploadButtonState { message: string; }

class UploadButton extends React.Component<UploadButtonProps, UploadButtonState> {

	/**
	 * Component constructor.
	 */
	constructor(props: UploadButtonProps) {
		super(props);

		this.state = {
			message: 'Send some shit',
		}

    	this.handleChange = this.handleChange.bind(this);
  	}

  	/**
  	 * Handle the file selection.
  	 *
  	 * @param  {FormEvent} event
  	 * @return {void}
  	 */
	public async handleChange(event: React.FormEvent<HTMLInputElement>) {
		const files: FileList | null = event.currentTarget.files

		if (files === null || files.length < 1) {
			return;
		}

		const file: File = files[0];

		if (file.size > 5000000) {
			return this.setState({
				message: 'File must be under 5MB',
			});
		}

		const name: string = file.name;
		const url: string = await readAsDataURL(file);

		this.setState({
			message: name,
		});

		this.props.handleUpload({
			name,
			url
		});
	}

	/**
	 * Render the component.
	 *
	 * @return {JSX}
	 */
  	public render() {
	    return (
			<span className="btn btn-default btn-file">
				{ this.state.message }
				<input type="file" onChange={ this.handleChange } />
			</span>
	    );
  	}
}

export default UploadButton;
