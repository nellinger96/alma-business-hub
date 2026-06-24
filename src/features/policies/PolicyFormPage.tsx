export function PolicyFormPage() {
  return (
    <div>
      <div className="page-heading row-between">
        <div>
          <h1>Home Policy Creation</h1>
          <p>Create a new customer, prospect, or policy file.</p>
        </div>

        <button className="primary-button">Import file</button>
      </div>

      <form className="policy-form">
        <section className="form-card narrow">
          <label>Customer Id:</label>
          <input />

          <label>First Name: <span className="required">*</span></label>
          <input className="required-input" />

          <label>Middle Name:</label>
          <input />

          <label>Last Name: <span className="required">*</span></label>
          <input className="required-input" />

          <div className="radio-row">
            <span>Gender:</span>
            <label><input type="radio" name="gender" defaultChecked /> Male</label>
            <label><input type="radio" name="gender" /> Female</label>
          </div>

          <label>DOB:</label>
          <input type="date" />

          <label>Marital Status:</label>
          <select defaultValue="Single">
            <option>Single</option>
            <option>Married</option>
          </select>

          <label>LOB:</label>
          <select defaultValue="Home Owner's">
            <option>Home Owner's</option>
            <option>Auto</option>
            <option>Commercial</option>
            <option>Life & Health</option>
          </select>
        </section>

        <section className="form-card wide">
          <h2>Physical Address</h2>

          <label>Street:</label>
          <input />

          <div className="form-grid-3">
            <div>
              <label>City:</label>
              <input />
            </div>
            <div>
              <label>State:</label>
              <select><option>Select...</option></select>
            </div>
            <div>
              <label>County:</label>
              <select><option>Select...</option></select>
            </div>
          </div>

          <label>Zip Code:</label>
          <input />
        </section>

        <section className="form-section">
          <h2>Contact Information</h2>

          <div className="form-grid-2">
            <div>
              <label>Contact Name:</label>
              <input placeholder="Primary Contact Name" />
            </div>
            <div>
              <label>Contact Method:</label>
              <select><option>Select...</option></select>
            </div>
            <div>
              <label>Home:</label>
              <input placeholder="(___) ___-____" />
            </div>
            <div>
              <label>Email 1:</label>
              <input placeholder="@" />
            </div>
            <div>
              <label>Mobile 1:</label>
              <input placeholder="(___) ___-____" />
            </div>
            <div>
              <label>Office:</label>
              <input placeholder="(___) ___-____" />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h2>Additional Information</h2>

          <div className="form-grid-2">
            <div>
              <label>SSN:</label>
              <input placeholder="000-00-0000" />
            </div>
            <div>
              <label>D.L Image:</label>
              <input type="file" />
            </div>
            <div>
              <label>Driver License:</label>
              <input />
            </div>
            <div>
              <label>Status:</label>
              <select defaultValue="Active">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </section>

        <section className="form-section">
          <h2>Policy</h2>

          <div className="form-grid-2">
            <div>
              <label>Property Address:</label>
              <input placeholder="Address" />
            </div>
            <div>
              <label>Coverage Type:</label>
              <select>
                <option>CEA (California Earthquake Authority)</option>
              </select>
            </div>
            <div>
              <label>Carrier:</label>
              <select className="required-input">
                <option>Select</option>
              </select>
            </div>
            <div>
              <label>Initial Payment:</label>
              <input placeholder="$" />
            </div>
            <div>
              <label>NAIC#:</label>
              <input />
            </div>
            <div>
              <label>Term Premium:</label>
              <input placeholder="$" />
            </div>
          </div>
        </section>

        <div className="form-actions">
          <button type="button" className="secondary-button">Save Draft</button>
          <button type="button" className="primary-button">Create Policy</button>
        </div>
      </form>
    </div>
  )
}
