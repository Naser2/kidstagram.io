export default function StirpePaymentModal() {
    return (
     <div data-focus-lock-disabled="false"><div className="modal-root modal-is-open modal-with-close-icon billing-setup-modal"><div className="modal-backdrop"></div><div className="modal-dialog-container" ><div className="modal-dialog modal-size-medium" aria-modal="true" role="dialog"
      // style=""
     ><form>
      <div className="modal-header heading-medium">Add payment details</div>
     <div className="modal-body body-small">
      <div className="billing-form-grid"><div className="notice notice-neutral has-body">
      <div className="notice-message"><div className="notice-body body-small"><div>Add your credit card details below. This card will be saved to your account and can be removed at any time.</div></div></div></div><div><label className="form-label mb-2"><div className="body-small flex items-center">
          <div className="mr-2"
          //  style="font-weight: 500;"
      >Card information</div></div></label><div className="stripe-card-form max-h-12">
      <div className="StripeElement StripeElement--empty"><div className="__PrivateStripeElement"
      // style="margin: 0px !important; padding: 0px !important; border: none !important; display: block !important; background: transparent !important; position: relative !important; opacity: 1 !important;"
      ><iframe name="__privateStripeFrame2933"  role="presentation" allow="payment *" src="https://js.stripe.com/v3/elements-inner-card-81e1f9decf1a3b13e48bc705f3005b71.html#fonts[0][family]=ColfaxAI&amp;fonts[0][src]=url(https%3A%2F%2Fcdn.openai.com%2FAPI%2Ffonts%2FColfaxAIRegular.woff2)+format(%22woff2%22)&amp;fonts[0][weight]=normal&amp;fonts[0][__resolveFontRelativeTo]=https%3A%2F%2Fplatform.openai.com%2Fsettings%2Forganization%2Fbilling%2Foverview&amp;fonts[1][family]=ColfaxAI&amp;fonts[1][src]=url(https%3A%2F%2Fcdn.openai.com%2FAPI%2Ffonts%2FColfaxAIBold.woff2)+format(%22woff2%22)&amp;fonts[1][weight]=bold&amp;fonts[1][__resolveFontRelativeTo]=https%3A%2F%2Fplatform.openai.com%2Fsettings%2Forganization%2Fbilling%2Foverview&amp;wait=false&amp;mids[guid]=3d629d9d-1f1d-47da-939a-37f240b8ce4355a2b8&amp;mids[muid]=d8218232-34e9-4673-b207-19ca71d5e30c48ea92&amp;mids[sid]=fe64ddba-5e18-4639-b80a-60d839ed93191c6e95&amp;style[base][fontFamily]=ColfaxAI%2C+Helvetica%2C+sans-serif&amp;style[base][fontSize]=14px&amp;style[base][color]=%23f7f7f8&amp;style[base][iconColor]=%23f7f7f8&amp;style[base][::placeholder][color]=%238E8EA0&amp;style[invalid][color]=%23ef4146&amp;rtl=false&amp;componentName=card&amp;keyMode=live&amp;apiKey=pk_live_51HOrSwC6h1nxGoI3lTAgRjYVrz4dU3fVOabyCcKR3pbEJguCVAlqCxdxCUvoRh1XWwRacViovU3kLKvpkjh7IqkW00iXQsjo3n&amp;referrer=https%3A%2F%2Fplatform.openai.com%2Fsettings%2Forganization%2Fbilling%2Foverview&amp;controllerId=__privateStripeController2931" 
      // title="Secure card payment input frame" style="border: 0px !important; margin-top: -0.5px; margin-right: 0px !important; margin-bottom: 0px !important; margin-left: 0px !important; padding: 0px !important; width: 1px !important; min-width: 100% !important; overflow: hidden !important; display: block !important; user-select: none !important; transform: translate(0px) !important; color-scheme: light only !important; height: 16.8px;"
      ></iframe>
      <input className="__PrivateStripeElement-input" aria-hidden="true" aria-label=" " autoComplete="false" maxLength={1}
      //  style="border: none !important; display: block !important; position: absolute !important; height: 1px !important; top: -1px !important; left: 0px !important; padding: 0px !important; margin: 0px !important; width: 100% !important; opacity: 0 !important; background: transparent !important; pointer-events: none !important; font-size: 16px !important;"
       /></div></div></div></div><div><label className="form-label mb-2">
      <div className="body-small flex items-center"><div className="mr-2" 
      // style="font-weight: 500;"
      >Name on card</div></div></label>
      <input className="text-input text-input-sm text-input-full" type="text" placeholder="" value=""/></div><div><label className="form-label mb-2"><div className="body-small flex items-center"><div className="mr-2" style={{"fontWeight": "500"}}>
      Billing address</div></div></label><div className="billing-address-inputs"><div className="select-base css-b62m3t-container"><span id="react-select-4-live-region" className="css-7pg0cj-a11yText"></span><span aria-live="polite" aria-atomic="false" aria-relevant="additions text" className="css-7pg0cj-a11yText"></span><div className=" css-1y25fr8-control"><div className=" css-eknp4g"><div className=" css-24x2qg-placeholder" id="react-select-4-placeholder">
          Country</div><div className=" css-17wv8nz" data-value="">
          <input className=""   id="react-select-4-input"  type="text" aria-autocomplete="list" aria-expanded="false" aria-haspopup="true" role="combobox" aria-describedby="react-select-4-placeholder" value=""
      //  style="color: inherit; background: 0px center; opacity: 1; width: 100%; grid-area: 1 / 2; font: inherit; min-width: 2px; border: 0px; margin: 0px; outline: 0px; padding: 0px;"
      /></div></div><div className=" css-1p1cok9">
          <div className="select-dropdown-indicator css-1bc6uwk-indicatorContainer" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M11.341 4.747a1 1 0 0 1 1.318 0l4 3.5a1 1 0 1 1-1.317 1.506L12 6.829 8.659 9.753a1 1 0 0 1-1.317-1.506l4-3.5Zm-4.095 9.61a1 1 0 0 1 1.41-.096L12 17.174l3.343-2.913a1 1 0 1 1 1.314 1.508l-4 3.485a1 1 0 0 1-1.314 0l-4-3.485a1 1 0 0 1-.097-1.411Z" clip-rule="evenodd"></path></svg></div></div></div>
      <input name="country" type="hidden" value=""/>
      </div>
      <input className="text-input text-input-sm text-input-full" type="text" name="billing-address-line-1" placeholder="Address line 1" value=""/>
      <input className="text-input text-input-sm text-input-full" type="text" name="billing-address-line-2" placeholder="Address line 2" value=""
      /><div className="billing-form-hgrid">
          <input className="text-input text-input-sm text-input-full" type="text" name="billing-city" placeholder="City" value=""/><input className="text-input text-input-sm text-input-full" type="text" name="billing-postal-code" placeholder="Postal code" value=""/></div><input className="text-input text-input-sm text-input-full" type="text" name="billing-state" placeholder="State, county, province, or region" value=""/>
          </div></div></div></div><div className="modal-footer"><button type="button"  className="btn btn-sm btn-filled btn-neutral modal-button"><span className="btn-label-wrap"><span className="btn-label-inner">Cancel</span></span></button><button type="submit" className="btn btn-sm btn-filled btn-primary modal-button"><span className="btn-label-wrap"><span className="btn-label-inner">Continue</span></span></button></div></form><button type="button" className="btn btn-md btn-minimal btn-neutral modal-close" aria-label="Close"><span className="btn-label-wrap"><span className="btn-label-inner"><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span></span></button></div></div></div></div>
    );
  }